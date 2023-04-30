import fs from "fs";
import path from "path";

import connectMongo from "@config/mongo";
import logger from "@config/logger";
import Profile from "@models/Profile";
import Link from "@models/Link";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    // TODO: lock down to system only, check for environment variable
    return res.status(401).json({ error: "ONLY system calls allowed" });
  }
  const connection = await connectMongo();

  // 1. load all profiles
  const basicProfiles = findAllBasic();
  const fullProfile = basicProfiles.map((profile) =>
    findOneByUsernameFull(profile)
  );

  // 2. save basic profiles to database
  // only if `source` is not `database` (this will be set when using forms)
  fullProfile.map(async (profile) => {
    // TODO: DEBUG
    if (profile.username === "eddiejaoude") {
      console.log(profile.milestones);
    }

    let currentProfile;
    try {
      currentProfile = await Profile.findOne({
        username: profile.username,
      });
    } catch (e) {
      logger.error(e, `failed to find profile ${profile.username}`);
    }

    if (!currentProfile || currentProfile.source === "database") {
      console.log("database", "skip", profile.username);
      return;
    }

    currentProfile = await Profile.findOneAndUpdate(
      { username: profile.username },
      {
        source: "file",
        name: profile.name,
        bio: profile.bio,
        tags: profile.tags,
      },
      { upsert: true }
    );

    try {
      if (profile.links) {
        const enabledLinks = [];
        profile.links.map(async (link, position) => {
          enabledLinks.push(link);
          await Link.findOneAndUpdate(
            { username: profile.username, url: link.url },
            {
              group: link.group,
              name: link.name,
              url: link.url,
              icon: link.icon,
              isEnabled: true,
              isPinned: link.isPinned,
              profile: currentProfile._id,
              order: position,
            },
            { upsert: true }
          );
        });

        currentProfile = await Profile.findOneAndUpdate(
          { username: profile.username },
          {
            links: (
              await Link.find({ username: profile.username })
            ).map((link) => link._id),
          }
        );

        // disable LINKS not in json file
        currentProfile.links
          .filter((link) => link.url !== enabledLinks.url)
          .map(async (link) => {
            await Link.findOneAndUpdate(
              { username: profile.username, url: link.url },
              { isEnabled: false }
            );
          });
      }
    } catch (e) {
      logger.error(e, `failed to update links for ${profile.username}`);
    }

    // 2. milestones
    try {
      if (profile.milestones) {
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
      }
    } catch (e) {
      logger.error(e, `failed to update milestones for ${profile.username}`);
    }

    // - testimonials (enable selected testimonials)
    // - events
  });

  return res.status(200).json({ message: "success" });
}

function findAllBasic() {
  const directoryPath = path.join(process.cwd(), "data");

  let files = [];
  try {
    files = fs
      .readdirSync(directoryPath)
      .filter((item) => item.includes("json"));
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

  const filePathTestimonials = path.join(
    process.cwd(),
    "data",
    username,
    "testimonials"
  );
  // Map all testimonial files to an array of objects with new db schema
  try {
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
          isPinned: !!data.testimonials.includes(username),
        };
      });

    data = { ...data, testimonials: allTestimonials };
  } catch (e) {}

  const filePathEvents = path.join(process.cwd(), "data", username, "events");
  let eventFiles = [];
  try {
    eventFiles = fs.readdirSync(filePathEvents);
  } catch (e) {}

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
      return [];
    }
  });

  if (events.length) {
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
    delete data.socials;
  }
  return data;
}
