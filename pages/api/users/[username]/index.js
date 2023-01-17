import fs from "fs";
import path from "path";

import connectMongo from "../../../../config/mongo";
import logger from "../../../../config/logger";

import Profile from "../../../../models/Profile";
import Link from "../../../../models/Link";
import Stats from "../../../../models/Stats";
import ProfileStats from "../../../../models/ProfileStats";

export default async function handler(req, res) {
  let log;
  await connectMongo();
  const { username } = req.query;
  log = logger.child({ username: username });

  const filePath = path.join(process.cwd(), "data", `${username}.json`);
  let data = {};
  try {
    data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    log.info(`data loaded for username: ${username}`);
  } catch (e) {
    log.error(e, `profile loading failed for username: ${username}`);
    return res.status(404).json({});
  }

  if (data.testimonials) {
    const filePathTestimonials = path.join(
      process.cwd(),
      "data",
      username,
      "testimonials"
    );
    const testimonials = data.testimonials.flatMap((testimonialUsername) => {
      try {
        const testimonial = {
          ...JSON.parse(
            fs.readFileSync(
              path.join(filePathTestimonials, `${testimonialUsername}.json`),
              "utf8"
            )
          ),
          username: testimonialUsername,
        };

        // check testimonial author for LinkFree profile
        try {
          const filePath = path.join(
            process.cwd(),
            "data",
            `${testimonialUsername}.json`
          );
          JSON.parse(fs.readFileSync(filePath, "utf8"));

          return {
            ...testimonial,
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/${testimonialUsername}`,
          };
        } catch (e) {
          log.warn(
            `testimonial ${testimonialUsername} loading failed for username: ${username}`
          );
          return {
            ...testimonial,
            url: `https://github.com/${testimonialUsername}`,
          };
        }
      } catch (e) {
        return [];
      }
    });
    data = { ...data, testimonials };
  }

  const filePathEvents = path.join(process.cwd(), "data", username, "events");
  let eventFiles = [];
  try {
    eventFiles = fs
      .readdirSync(filePathEvents)
      .filter((item) => item.includes("json"));
  } catch (e) {
    log.error(`loading events for ${username} in ${filePathEvents}`);
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
      return [];
    }
  });
  if (events.length) {
    data = { ...data, events };
  }

  const date = new Date();
  date.setHours(1, 0, 0, 0);

  const getProfile = await Profile.findOne({ username });
  if (!getProfile) {
    try {
      await Profile.create({
        username,
        views: 1,
      });
      log.info(`stats created for username: ${username}`);
    } catch (e) {
      log.error(e, `failed to create profile stats for username: ${username}`);
    }

    try {
      await Stats.updateOne(
        {
          date,
        },
        {
          $inc: { users: 1 },
        }
      );
      log.info(`app profile stats incremented for username: ${username}`);
    } catch (e) {
      log.error(e, `app profile stats failed for ${username}`);
    }
  }
  if (getProfile) {
    try {
      await Profile.updateOne(
        {
          username,
        },
        {
          $inc: { views: 1 },
        }
      );
      log.info(`stats incremented for username: ${username}`);
    } catch (e) {
      log.error(
        e,
        `failed to incremente profile stats for username: ${username}`
      );
    }
  }

  const getProfileStats = await ProfileStats.findOne({
    username: username,
    date: date,
  });
  if (getProfileStats) {
    try {
      await ProfileStats.updateOne(
        {
          username: username,
          date,
        },
        {
          $inc: { views: 1 },
        }
      );
      log.info(`profile daily stats incremented for username: ${username}`);
    } catch (e) {
      log.error(
        e,
        "failed to increment profile stats for usernanme: ${username}"
      );
    }
  }
  if (!getProfileStats) {
    try {
      await ProfileStats.create({
        username: username,
        date,
        views: 1,
        profile: getProfile._id,
      });
      log.info(`profile daily stats started for username: ${username}`);
    } catch (e) {
      log.error(e, `failed creating profile stats for username: ${username}`);
    }
  }

  const getPlatformStats = await Stats.findOne({ date });
  if (getPlatformStats) {
    try {
      await Stats.updateOne(
        {
          date,
        },
        {
          $inc: { views: 1 },
        }
      );
      log.info(`app daily stats incremented for username: ${username}`);
    } catch (e) {
      log.error(
        e,
        `failed incrementing platform stats for username: ${username}`
      );
    }
  }

  if (!getPlatformStats) {
    try {
      await Stats.create({
        date,
        views: 1,
        clicks: 0,
        users: 1,
      });
      log.info(`app daily stats created for username: ${username}`);
    } catch (e) {
      log.error(e, `failed creating platform stats for username: ${username}`);
    }
  }

  if (!data.displayStatsPublic) {
    return res.status(200).json({ username, ...data });
  }

  const latestProfile = await Profile.findOne({ username });
  const links = await Link.find({ profile: latestProfile._id });

  const profileWithStats = {
    username,
    ...data,
    views: latestProfile.views,
    links: data.links.map((link) => {
      const statFound = links.find((linkStats) => linkStats.url === link.url);
      if (statFound) {
        return {
          ...link,
          clicks: statFound.clicks,
        };
      }

      return link;
    }),
  };

  res.status(200).json(profileWithStats);
}
