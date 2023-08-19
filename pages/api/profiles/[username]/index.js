import { authOptions } from "../../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { ObjectId } from "bson";

import connectMongo from "@config/mongo";
import logger from "@config/logger";
import { Profile, Stats, ProfileStats, User } from "@models/index";

import getLocation from "@services/github/getLocation";
import { checkGitHubRepo } from "@services/github/getRepo";
import dateFormat from "@services/utils/dateFormat";

export default async function handler(req, res) {
  const username = req.query.username;
  if (!username) {
    return res
      .status(400)
      .json({ error: "Invalid request: username is required" });
  }

  const { status, profile } = await getUserApi(req, res, username);
  return res.status(status).json(profile);
}

export async function getUserApi(req, res, username, options = {}) {
  await connectMongo();
  let isOwner = false;
  const session = await getServerSession(req, res, authOptions);
  if (session && session.username === username) {
    isOwner = true;
  }

  let getProfile = await Profile.findOne({ username, isEnabled: true });

  if (!getProfile) {
    logger.error(`Failed loading profile username: ${username}`);
    return {
      status: 404,
      profile: {
        error: `${username} not found`,
      },
    };
  }

  await getLocation(username, getProfile);
  if (getProfile.repos?.length > 0) {
    await checkGitHubRepo(username, getProfile.repos);
  }

  const log = logger.child({ username });
  getProfile = await Profile.aggregate([
    {
      $match: { username },
    },
    {
      $addFields: {
        testimonials: {
          $filter: {
            input: "$testimonials",
            as: "testimonial",
            cond: {
              $eq: ["$$testimonial.isPinned", true],
            },
          },
        },
      },
    },
    {
      $lookup: {
        from: "links",
        localField: "links",
        foreignField: "_id",
        as: "links",
      },
    },
    {
      $project: {
        __v: 0,
        "links.__v": 0,
        "links.clicks": 0,
        "links.createdAt": 0,
        "links.updatedAt": 0,
        "testimonials.isPinned": 0,
      },
    },
  ]);
  getProfile = getProfile[0];

  getProfile = {
    ...getProfile,
    links: getProfile.links
      .filter((link) => link.isEnabled)
      .sort(
        (a, b) => (a.order ?? Number.MAX_VALUE) - (b.order ?? Number.MAX_VALUE)
      ),
    socials: getProfile.links
      .filter((link) => link.isPinned)
      .map((link) => ({
        _id: link._id,
        url: link.url,
        icon: link.icon,
      })),
  };

  let getUser = {};
  if (getProfile.user) {
    getUser = await User.findOne({ _id: new ObjectId(getProfile.user) });

    getProfile = {
      ...getProfile,
      accountType: getUser.type || "free",
    };
  } else {
    getProfile = {
      ...getProfile,
      accountType: "free",
    };
  }
  delete getProfile.user;

  if (getProfile.events) {
    let dateEvents = [];
    const today = new Date();
    getProfile.events.map((event) => {
      let cleanEvent = JSON.parse(JSON.stringify(event));
      try {
        const start = new Date(event.date.start);
        const end = new Date(event.date.end);
        cleanEvent.date.startFmt = dateFormat({
          format: "long",
          date: event.date.start,
        });
        cleanEvent.date.endFmt = dateFormat({
          format: "long",
          date: event.date.end,
        });

        cleanEvent.date.cfpOpen =
          event.date.cfpClose && new Date(event.date.cfpClose) > today;
        cleanEvent.date.future = start > today;
        cleanEvent.date.ongoing = start < today && end > today;
        dateEvents.push(cleanEvent);
      } catch (e) {
        logger.error(e, `ERROR event date for: "${event.name}"`);
      }
    });

    getProfile.events = dateEvents;
  } else {
    getProfile.events = [];
  }

  let updates = [];
  const date = new Date();
  date.setHours(1, 0, 0, 0);

  if (!isOwner) {
    updates.push(
      (async () => {
        try {
          await Stats.updateOne(
            {
              date,
            },
            {
              $inc: { users: 1 },
            },
            { upsert: true }
          );
          log.info(`app profile stats incremented for username: ${username}`);
        } catch (e) {
          log.error(e, `app profile stats failed for ${username}`);
        }
      })()
    );

    let increment = { views: 1 };
    if (options.referer) {
      const referer = new URL(options.referer);
      increment[`stats.referers.${referer.hostname.replaceAll(".", "|")}`] = 1;
    }
    if (options.ip) {
      try {
        const ipLookupRes = await fetch(
          `https://api.iplocation.net/?ip=${options.ip}`
        );
        const ipLookup = await ipLookupRes.json();
        increment[`stats.countries.${ipLookup.country_code2}`] = 1;
      } catch (e) {
        increment[`stats.countries.-`] = 1;
        log.error(e, `failed to get country for ip: ${options.ip}`);
      }
    }

    updates.push(
      (async () => {
        try {
          await Profile.updateOne(
            {
              username,
            },
            {
              $inc: increment,
            },
            { timestamps: false }
          );
          log.info(`stats incremented for username: ${username}`);
        } catch (e) {
          log.error(
            e,
            `failed to increment profile stats for username: ${username}`
          );
        }
      })()
    );

    updates.push(
      (async () => {
        try {
          await ProfileStats.updateOne(
            {
              username: username,
              date,
            },
            {
              $inc: increment,
            },
            { upsert: true }
          );
          log.info(`profile daily stats incremented for username: ${username}`);
        } catch (e) {
          log.error(
            e,
            "failed to increment profile stats for username: ${username}"
          );
        }
      })()
    );
  }

  updates.push(
    (async () => {
      try {
        await Stats.updateOne(
          {
            date,
          },
          {
            $inc: { views: 1 },
          },
          { upsert: true }
        );
        log.info(`app daily stats incremented for username: ${username}`);
      } catch (e) {
        log.error(
          e,
          `failed incrementing platform stats for username: ${username}`
        );
      }
    })()
  );

  await Promise.allSettled(updates);

  return JSON.parse(
    JSON.stringify({
      status: 200,
      profile: getProfile,
    })
  );
}
