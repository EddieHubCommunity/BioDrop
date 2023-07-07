import { authOptions } from "../../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import connectMongo from "@config/mongo";
import logger from "@config/logger";
import { Profile, Stats, ProfileStats } from "@models/index";

import getLocation from "@services/github/getLocation";

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

export async function getUserApi(req, res, username) {
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

  if (getProfile.events) {
    let dateEvents = [];
    const today = new Date();
    getProfile.events.map((event) => {
      let cleanEvent = JSON.parse(JSON.stringify(event));
      const dateTimeStyle = {
        dateStyle: "full",
        timeStyle: "long",
      };
      try {
        const start = new Date(event.date.start);
        const end = new Date(event.date.end);
        cleanEvent.date.startFmt = new Intl.DateTimeFormat(
          "en-GB",
          dateTimeStyle
        ).format(start);
        cleanEvent.date.endFmt = new Intl.DateTimeFormat(
          "en-GB",
          dateTimeStyle
        ).format(end);

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

    updates.push(
      (async () => {
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
              $inc: { views: 1 },
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
