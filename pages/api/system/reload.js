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
  const basicProfiles = await findAllBasic();
  const fullProfiles = await Promise.all(
    basicProfiles.map((profile) => findOneByUsernameFull(profile))
  ).then((profiles) => profiles.filter((profile) => profile !== null));

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

        if (profile.testimonials) {
          // add any new testimonials
          const newTestimonials = profile.testimonials.filter(
            (testimonial) =>
              !currentProfile.testimonials.some(
                (currentTestimonial) =>
                  currentTestimonial.username === testimonial.username
              )
          );

          if (!newTestimonials || newTestimonials.length === 0) {
            return;
          }

          try {
            await Profile.findOneAndUpdate(
              { username: profile.username },
              {
                testimonials: [
                  ...currentProfile.testimonials,
                  ...newTestimonials.map((testimonials) => ({
                    username: testimonials.username,
                    date: testimonials.date,
                    title: testimonials.title,
                    description: testimonials.description,
                    isPinned: false,
                  })),
                ],
              }
            );
            logger.info(
              `Updated profile "${profile.username}" with testimonials only ${newTestimonials.length}`
            );
          } catch (e) {
            logger.error(
              e,
              `failed to update testimonials for ${profile.username}`
            );
          }
        }
        return;
      }

      try {
        if (profile.milestones) {
          const milestones = profile.milestones.map((milestone) => {
            let date = {};
            const convert = new Date(milestone.date)
            if (convert.toString() !== "Invalid Date") {
              date = {
                date: convert
              }
            }

            return {
              url: milestone.url,
              isGoal: milestone.isGoal || false,
              title: milestone.title,
              icon: milestone.icon,
              description: milestone.description,
              ...date
            }
          });

          await Profile.findOneAndUpdate(
            { username: profile.username },
            {
              milestones
            }
          );
        }
      } catch (e) {
        logger.error(e, `failed to update profile ${profile.username}`);
      }

      // 3. testimonials (enable selected testimonials)
      try {
        if (profile.testimonials) {
          await Profile.findOneAndUpdate(
            { username: profile.username },
            {
              testimonials: profile.testimonials.map((testimonials) => ({
                username: testimonials.username,
                date: testimonials.date,
                title: testimonials.title,
                description: testimonials.description,
                isPinned: testimonials.isPinned || false,
              })),
            }
          );
        }
      } catch (e) {
        logger.error(
          e,
          `failed to update testimonials for ${profile.username}`
        );
      }

      // - events
      try {
        if (profile.events) {
          await Profile.findOneAndUpdate(
            { username: profile.username },
            {
              events: profile.events.map((event) => ({
                isVirtual: event.isVirtual,
                color: event.color,
                name: event.name,
                description: event.description,
                date: {
                  start: event.date.start,
                  end: event.date.end,
                },
                url: event.url,
                price: event.price,
              })),
            }
          );
        }
      } catch (e) {
        logger.error(e, `failed to update events for ${profile.username}`);
      }
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

async function findAllBasic() {
  const directoryPath = path.join(process.cwd(), "data");
  let files = [];

  try {
    const filesDirPath = await fs.promises.readdir(directoryPath);
    files = filesDirPath.filter((item) => item.endsWith("json"));
  } catch (e) {
    logger.error(e, "failed to list profiles");
  }

  const users = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(directoryPath, file);
      try {
        const userFile = await fs.promises.readFile(filePath, "utf8");
        const json = JSON.parse(userFile);

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
        return null;
      }
    })
  ).then((users) => users.filter((user) => user !== null));

  return users;
}

async function findOneByUsernameFull(data) {
  const username = data.username;
  const basePath = path.join(process.cwd(), "data", username);
  const filePathTestimonials = path.join(basePath, "testimonials");
  const filePathEvents = path.join(basePath, "events");

  // get testimonials for user if they exist (e.g. /data/username/testimonials)
  const allTestimonials = await getTestimonials(filePathTestimonials, data);
  data = { ...data, testimonials: allTestimonials };

  // get events for user if they exist (e.g. /data/username/events)
  const allEvents = await getEvents(filePathEvents, username);
  if (allEvents.length) {
    data = { ...data, events: allEvents };
  }

  // update links with isPinned
  data.links = updateLinks(data);

  // validate each profile against the schema and return the validated profile
  const validatedProfile = validateFullProfile(data, username);

  return validatedProfile;
}

async function getTestimonials(filePathTestimonials, data) {
  // Map all testimonial files to an array of objects with new db schema
  try {
    // If the testimonials folder exists for the current user, map all testimonial files to an array of objects with new db schema
    if (await checkFilePathExists(filePathTestimonials)) {
      const testimonialFiles = await fs.promises.readdir(filePathTestimonials);
      return Promise.all(
        testimonialFiles.map(async (testimonialFile) => {
          const username = testimonialFile.split(".")[0];
          const fileData = await fs.promises.readFile(
            path.join(filePathTestimonials, testimonialFile),
            "utf8"
          );

          return {
            ...JSON.parse(fileData),
            username: username,
            isPinned: !!data.testimonials?.includes(username) ?? false,
          };
        })
      );
    } else {
      return [];
    }
  } catch (e) {
    logger.error(e, `failed to list testimonials for ${data.username}`);
  }
}

async function getEvents(filePathEvents, username) {
  let eventFiles = [];

  try {
    if (await checkFilePathExists(filePathEvents)) {
      eventFiles = await fs.promises.readdir(filePathEvents);
    } else {
      eventFiles = [];
    }
  } catch (e) {
    logger.error(e, `failed to list events for ${username}`);
  }

  return Promise.all(
    eventFiles.map(async (filename) => {
      try {
        const filePath = await fs.promises.readFile(
          path.join(filePathEvents, filename),
          "utf8"
        );
        return {
          ...JSON.parse(filePath),
          username,
        };
      } catch (e) {
        logger.error(e, `Failed loading event in: ${filePathEvents}`);
        return [];
      }
    })
  );
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

async function updateProfileProperties(profile) {
  if (!profile) {
    return;
  }

  const updateObject = {};
  for (const propertyName of ["milestones", "testimonials", "events"]) {
    // Check if property exists and it's an array, else continue to the next property
    if (!Array.isArray(profile[propertyName])) {
      continue;
    }

    updateObject[propertyName] = profile[propertyName].map(
      (property, position) => {
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
      }
    );
  }

  try {
    await Profile.findOneAndUpdate(
      { username: profile.username },
      updateObject
    );
  } catch (e) {
    logger.error(e, `Failed to update profile for ${profile.username}`);
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

async function checkFilePathExists(filePath) {
  try {
    await fs.promises.access(filePath);
    return true;
  } catch (e) {
    return false;
  }
}
