import fs from "fs";
import path from "path";

import { serverEnv } from "@config/schemas/serverSchema";
import connectMongo from "@config/mongo";
import logger from "@config/logger";
import Profile from "@models/Profile";
import Link from "@models/Link";
import { extendedProfileSchema } from "@config/schemas/validationSchemas";

export default async function handler(req, res) {
  if (
    req.method !== "GET" ||
    req.query.secret !== serverEnv.LINKFREE_API_SECRET
  ) {
    logger.error(
      `attempt to load profile json but security check failed: "${req.query.secret}"`
    );
    return res.status(401).json({ error: "ONLY system calls allowed" });
  }

  await connectMongo();

  // 1. load all profiles
  const basicProfiles = findAllBasic();
  const fullProfiles = basicProfiles
    .map((profile) => findOneByUsernameFull(profile))
    .filter((profile) => profile !== null);

  // 2. save basic profiles to database
  // only if `source` is not `database` (this will be set when using forms)
  await Promise.all(
    fullProfiles.map(async (profile) => {
      let currentProfile;

      try {
        currentProfile = await Profile.findOne({
          username: profile.username,
        });
      } catch (e) {
        logger.error(e, `failed to find profile ${profile.username}`);
      }

      if (currentProfile && currentProfile.source === "database") {
        logger.info(`Skipped profile "${profile.username}" as using forms`);
        return;
      }

      try {
        currentProfile = await Profile.findOneAndUpdate(
          { username: profile.username },
          {
            source: "file",
            isEnabled: true,
            name: profile.name,
            bio: profile.bio,
            tags: profile.tags,
          },
          { upsert: true, new: true }
        );
      } catch (e) {
        logger.error(e, `failed to update profile ${profile.username}`);
      }

      const jsonFileLinks = await updateProfileLinks(currentProfile, profile);
      disableLinksAndSocialsNotInJsonFile(currentProfile, jsonFileLinks);

      // 2. add milestones to the profile in the db
      updateProfileProperty(profile, "milestones");
      // 3. add testimonials to the profile in the db
      updateProfileProperty(profile, "testimonials");
      // 4. add events to the profile in the db
      updateProfileProperty(profile, "events");
    })
  );

  // all "file" profiles not in json files should be disabled
  const allProfiles = await Profile.find({ source: "file" });
  const allUsernames = basicProfiles.map((profile) => profile.username);
  const disabledProfiles = [];
  await Promise.all(
    allProfiles.map(async (profile) => {
      if (!allUsernames.includes(profile.username)) {
        disabledProfiles.push(profile.username);
        return await Profile.findOneAndUpdate(
          { username: profile.username },
          { isEnabled: false }
        );
      }

      return;
    })
  );

  return res.status(200).json({
    message: "success",
    statistics: {
      basic: basicProfiles.length,
      full: fullProfiles.length,
      disabled: disabledProfiles.length,
    },
  });
}

function findAllBasic() {
  const directoryPath = path.join(process.cwd(), "data");
  let files = [];

  try {
    files = fs
      .readdirSync(directoryPath)
      .filter((item) => item.endsWith("json"));
  } catch (e) {
    logger.error(e, "failed to list profiles");
  }

  const users = files.flatMap((file) => {
    const filePath = path.join(directoryPath, file);
    try {
      const json = JSON.parse(fs.readFileSync(filePath, "utf8"));

      return {
        ...json,
        name: json.name,
        bio: json.bio,
        avatar: `https://github.com/${file.split(".")[0]}.png`,
        tags: json.tags,
        username: file.split(".")[0],
      };
    } catch (e) {
      logger.error(e, `failed loading profile in: ${filePath}`);
      return [];
    }
  });

  return users;
}

function findOneByUsernameFull(data) {
  const username = data.username;
  const basePath = path.join(process.cwd(), "data", username);
  const filePathTestimonials = path.join(basePath, "testimonials");
  const filePathEvents = path.join(basePath, "events");

  // get testimonials for user if they exist (e.g. /data/username/testimonials)
  const allTestimonials = getTestimonials(filePathTestimonials, data);
  data = { ...data, testimonials: allTestimonials };

  // get events for user if they exist (e.g. /data/username/events)
  const allEvents = getEvents(filePathEvents, username);
  if (allEvents.length) {
    data = { ...data, events: allEvents };
  }

  // update links with isPinned
  data.links = updateLinks(data);

  // validate each profile against the schema and return the validated profile
  const validatedProfile = validateFullProfile(data, username);

  return validatedProfile;
}

function getTestimonials(filePathTestimonials, data) {
  // Map all testimonial files to an array of objects with new db schema
  try {
    // If the testimonials folder exists for the current user, map all testimonial files to an array of objects with new db schema
    if (fs.existsSync(filePathTestimonials)) {
      return fs.readdirSync(filePathTestimonials).map((testimonialFile) => {
        const username = testimonialFile.split(".")[0];

        return {
          ...JSON.parse(
            fs.readFileSync(
              path.join(filePathTestimonials, testimonialFile),
              "utf8"
            )
          ),
          username: username,
          isPinned: !!data.testimonials?.includes(username) ?? false,
        };
      });
    } else {
      return [];
    }
  } catch (e) {
    logger.error(e, `failed to list testimonials for ${data.username}`);
  }
}

function getEvents(filePathEvents, username) {
  let eventFiles = [];

  try {
    if (fs.existsSync(filePathEvents)) {
      eventFiles = fs.readdirSync(filePathEvents);
    } else {
      eventFiles = [];
    }
  } catch (e) {
    logger.error(e, `failed to list events for ${username}`);
  }

  return eventFiles.flatMap((filename) => {
    try {
      return {
        ...JSON.parse(
          fs.readFileSync(path.join(filePathEvents, filename), "utf8")
        ),
        username,
      };
    } catch (e) {
      logger.error(e, `Failed loading event in: ${filePathEvents}`);
      return [];
    }
  });
}

function validateFullProfile(data, username) {
  const result = extendedProfileSchema.safeParse(data);

  if (result.success) {
    return data;
  } else {
    logger.error(
      result.error.issues,
      `failed to parse profile for ${username}`
    );
    logger.error(`Profile ${username} not saved in the database.`);

    return null;
  }
}

function updateLinks(data) {
  if (data.links && data.socials) {
    const links = [];
    data.links.map((link) =>
      links.push({
        ...link,
        isPinned: data.socials.find((social) => social.url === link.url)
          ? true
          : false,
      })
    );
  }

  return data.links;
}

async function updateProfileProperty(profile, propertyName) {
  if (!profile || !profile[propertyName] || !profile[propertyName].length) {
    return;
  }

  try {
    const updateObject = {
      [propertyName]: profile[propertyName].map((property, position) => {
        const updatedProperty = { ...property, order: position };

        switch (propertyName) {
          case "testimonials":
            updatedProperty.isPinned = property.isPinned || false;
            break;
          case "milestones":
            updatedProperty.isGoal = property.isGoal || false;
            break;
          case "events":
            updatedProperty.isVirtual = property.isVirtual || false;
            break;
          default:
            break;
        }

        return updatedProperty;
      }),
    };

    await Profile.findOneAndUpdate(
      { username: profile.username },
      updateObject
    );
  } catch (e) {
    logger.error(e, `Failed to update ${propertyName} for ${profile.username}`);
  }
}

async function updateProfileLinks(currentProfile, profile) {
  const jsonFileLinks = [];

  if (currentProfile.links || profile.links || profile.socials) {
    if (profile.links) {
      try {
        await Promise.all(
          profile.links.map(async (link, position) => {
            jsonFileLinks.push(link);
            await Link.findOneAndUpdate(
              { username: profile.username, url: link.url },
              {
                group: link.group,
                name: link.name,
                url: link.url,
                icon: link.icon,
                isEnabled: true,
                isPinned: false,
                profile: currentProfile._id,
                order: position,
              },
              { upsert: true, new: true }
            );
          })
        );
      } catch (e) {
        logger.error(e, `failed to update links for ${profile.username}`);
      }
    }

    // add social urls to links but disable them if not in main links
    try {
      if (profile.socials && profile.socials.length > 0) {
        await Promise.all(
          profile.socials.map(async (social) => {
            jsonFileLinks.push(social);
            await Link.findOneAndUpdate(
              { username: profile.username, url: social.url },
              {
                url: social.url,
                icon: social.icon,
                isEnabled:
                  profile.links &&
                  profile.links.find((link) => social.url === link.url)
                    ? true
                    : false,
                isPinned: true,
                profile: currentProfile._id,
              },
              { upsert: true, new: true }
            );
          })
        );
      }
    } catch (e) {
      logger.error(
        e,
        `failed to update profile socials for ${profile.username}`
      );
    }

    // update profile with links
    if (jsonFileLinks.length > 0 || profile.socials) {
      await Profile.findOneAndUpdate(
        { username: profile.username },
        {
          links: (
            await Link.find({ username: profile.username })
          ).map((link) => link._id),
        },
        { upsert: true, new: true }
      );
    }

    currentProfile = await Profile.findOne({
      username: profile.username,
    }).populate({
      path: "links",
    });
  }

  return jsonFileLinks;
}

async function disableLinksAndSocialsNotInJsonFile(
  currentProfile,
  jsonFileLinks
) {
  // disable LINKS and SOCIALS not in json file
  try {
    await Promise.all(
      currentProfile.links
        .filter((link) => !jsonFileLinks.map((l) => l.url).includes(link.url))
        .map(async (link) => {
          await Link.findOneAndUpdate(
            { _id: link._id },
            { isEnabled: false, isPinned: false }
          );
        })
    );
  } catch (e) {
    logger.error(
      e,
      `Failed to disable links and socials for ${currentProfile.username}`
    );
  }
}
