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
  getProfile = await Profile.findOne(
    { username },
    "-__v -views -source"
  ).populate({
    path: "links",
    select: "-__v -clicks -profile",
    options: { sort: { order: 1 } },
  });

  getProfile = {
    ...getProfile._doc,
    links: getProfile._doc.links
      .filter((link) => link.isEnabled)
      .map((link) => ({
        _id: link._id,
        group: link.group,
        name: link.name,
        url: link.url,
        icon: link.icon,
        order: link.order,
      })),
    socials: getProfile._doc.links
      .filter((link) => link.isPinned)
      .map((link) => ({
        _id: link._id,
        url: link.url,
        icon: link.icon,
      })),
    testimonials: getProfile._doc.testimonials.map((testimonial) => ({
      _id: testimonial._id,
      isPinned: testimonial.isPinned,
      username: testimonial.username,
      title: testimonial.title,
      description: testimonial.description,
      date: testimonial.date,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/${testimonial.username}`,
      order: testimonial.order,
    })),
  };

  const date = new Date();
  date.setHours(1, 0, 0, 0);

  if (!isOwner) {
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
  }

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

  return JSON.parse(
    JSON.stringify({
      status: 200,
      profile: getProfile,
    })
  );
}
