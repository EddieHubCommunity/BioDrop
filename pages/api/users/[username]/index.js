import connectMongo from "../../../../config/mongo";
import logger from "../../../../config/logger";

import Profile from "../../../../models/Profile";
import Stats from "../../../../models/Stats";
import ProfileStats from "../../../../models/ProfileStats";

import findOneByUsernameFull from "../../../../services/profiles/findOneByUsernameFull";
import getLocation from "../../../../services/profiles/getLocation";

export default async function handler(req, res) {
  if (req.method != "GET") {
    return res
      .status(400)
      .json({ error: "Invalid request: GET request required" });
  }

  await connectMongo();
  const { username } = req.query;
  let log;
  log = logger.child({ username: username });
  const data = findOneByUsernameFull(username);

  if (!data.username) {
    logger.error(`failed loading profile username: ${username}`);
    return res.status(404).json({ error: `${username} not found` });
  }

  const date = new Date();
  date.setHours(1, 0, 0, 0);

  let getProfile = await Profile.findOne({ username });

  if (!getProfile) {
    try {
      getProfile = await Profile.create({
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
  } else {
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
        "failed to increment profile stats for username: ${username}"
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

  const latestProfile = await Profile.findOne({ username });
  await getLocation(username, latestProfile);
  const profileWithLocation = await Profile.findOne({ username });

  return res
    .status(200)
    .json({ username, ...data, location: profileWithLocation.location });
}
