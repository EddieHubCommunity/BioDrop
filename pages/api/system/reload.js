import fs from "fs";
import path from "path";

import { serverEnv } from "@config/schemas/serverSchema";
import connectMongo from "@config/mongo";
import logger from "@config/logger";
import Profile from "@models/Profile";
import Link from "@models/Link";
import { extendedProfileSchema } from "@config/schemas/validationSchemas";

// docker exec -it mongodb mongosh

function findAllBasic() {
  const directoryPath = path.join(process.cwd(), "data");
  let files;

  try {
    files = fs
      .readdirSync(directoryPath)
      .filter((item) => item.endsWith("json"));
  } catch (e) {
    logger.error(e, "failed to list profiles");
    return [];
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
        tags: json.tags || [],
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
  let eventFiles = [];

  // Map all testimonial files to an array of objects with new db schema
  try {
    // If the testimonials folder exists for the current user, map all testimonial files to an array of objects with new db schema
    if (fs.existsSync(filePathTestimonials)) {
      const allTestimonials = fs
        .readdirSync(filePathTestimonials)
        .map((testimonialFile) => {
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

      data = { ...data, testimonials: allTestimonials };
    } else {
      data = { ...data, testimonials: [] };
    }
  } catch (e) {
    logger.error(e, `failed to list testimonials for ${username}`);
  }

  try {
    if (fs.existsSync(filePathEvents)) {
      eventFiles = fs.readdirSync(filePathEvents);
    } else {
      eventFiles = [];
    }
  } catch (e) {
    logger.error(e, `failed to list events for ${username}`);
  }

  const events = eventFiles.flatMap((filename) => {
    try {
      const event = {
        ...JSON.parse(
          fs.readFileSync(path.join(filePathEvents, filename), "utf8")
        ),
        username,
      };

      return event;
    } catch (e) {
      logger.error(e, `failed loading event in: ${filePathEvents}`);
    }
  });

  if (events.length > 0) {
    data = { ...data, events };
  }

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
    data.links = links;
  }

  const result = extendedProfileSchema.safeParse(data);

  if (result.success) {
    return data;
  } else {
    logger.error(
      result.error.issues,
      `failed to parse profile for ${username}`
    );
    return null;
  }
}

async function updateProfileLinks(profile, currentProfile) {
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

async function disableLinksNotInJSON(currentProfile, jsonFileLinks) {
  // disable LINKS and SOCIALS not in json file
  const linksToDisable = currentProfile.links.filter(
    (link) => !jsonFileLinks.map((l) => l.url).includes(link.url)
  );

  for await (const link of linksToDisable) {
    try {
      await Link.findOneAndUpdate(
        { _id: link._id },
        { isEnabled: false, isPinned: false }
      );
    } catch (err) {
      logger.error(err, `failed to disable link ${link._id}`);
    }
  }
}

async function updateProfileMilestones(profile) {
  if (!profile.milestones) {
    return;
  }

  try {
    await Profile.findOneAndUpdate(
      { username: profile.username },
      {
        milestones: profile.milestones.map((milestone, position) => ({
          url: milestone.url,
          date: milestone.date,
          isGoal: milestone.isGoal || false,
          title: milestone.title,
          icon: milestone.icon,
          description: milestone.description,
          color: milestone.color,
          order: position,
        })),
      }
    );
  } catch (e) {
    logger.error(e, `failed to update milestones for ${profile.username}`);
  }
}

async function updateProfileTestimonials(profile) {
  if (!profile.testimonials) {
    return;
  }

  try {
    await Profile.findOneAndUpdate(
      { username: profile.username },
      {
        testimonials: profile.testimonials.map((testimonials, position) => ({
          username: testimonials.username,
          date: testimonials.date,
          title: testimonials.title,
          description: testimonials.description,
          order: position,
          isPinned: testimonials.isPinned || false,
        })),
      }
    );
  } catch (e) {
    logger.error(e, `failed to update testimonials for ${profile.username}`);
  }
}

async function updateProfileEvents(profile) {
  if (!profile.events) {
    return;
  }

  try {
    await Profile.findOneAndUpdate(
      { username: profile.username },
      {
        events: profile.events.map((event, position) => ({
          isVirtual: event.isVirtual,
          color: event.color,
          name: event.name,
          description: event.description,
          date: {
            start: event.date.start,
            end: event.date.end,
          },
          url: event.url,
          order: position,
          price: event.price,
        })),
      }
    );
  } catch (e) {
    logger.error(e, `failed to update events for ${profile.username}`);
  }
}

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
  const profileUpdates = fullProfiles.map(async (profile) => {
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

    const jsonFileLinks = await updateProfileLinks(profile, currentProfile);
    await disableLinksNotInJSON(currentProfile, jsonFileLinks);
    await updateProfileMilestones(profile);
    await updateProfileTestimonials(profile);
    await updateProfileEvents(profile);
  });

  await Promise.all(profileUpdates);

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
