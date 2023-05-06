import connectMongo from "@config/mongo";
import logger from "@config/logger";
import { Link, Profile, LinkStats, Stats } from "@models/index";
import findOneByUsernameBasic from "@services/profiles/findOneByUsernameBasic";

export default async function handler(req, res) {
  await connectMongo();

  const { username, url } = req.query;

  if (req.method != "GET") {
    return res
      .status(400)
      .json({ error: "Invalid request: GET request required" });
  }

  const data = findOneByUsernameBasic(username);

  if (!data.username) {
    logger.error(`failed loading profile username: ${username}`);
    return res.status(404).json({ error: `${username} not found` });
  }

  if (
    !data.links.find((link) => link.url === url) &&
    !data.socials.find((social) => social.url === url)
  ) {
    logger.error(`link ${url} not found for username ${username}`);
    return res.status(404).json({ error: `ERROR ${url} not found` });
  }

  let getProfile;
  try {
    getProfile = await Profile.findOne({ username });
  } catch (e) {
    logger.error(e, `failed loading profile username: ${username}`);
    return res.status(404).json({ error: `ERROR ${username} not found` });
  }

  if (!getProfile) {
    return res.status(404).json({ error: `ERROR ${username} not found` });
  }

  let getLink;
  try {
    getLink = await Link.findOne({ username, url });
  } catch (e) {
    logger.error(e, `failed loading link ${url} for username: ${username}`);
    return res.status(404).json({ error: `ERROR ${url} not found` });
  }

  if (getLink) {
    try {
      await Link.updateOne(
        {
          username,
          url,
        },
        {
          $inc: { clicks: 1 },
        }
      );
    } catch (e) {
      logger.error(
        e,
        `failed incrementing link: ${url} for username ${username}`
      );
    }
  }

  if (!getLink) {
    try {
      const link = await Link.create({
        profile: getProfile._id,
        username,
        url,
        clicks: 1,
      });

      await Profile.updateOne(
        {
          username,
        },
        {
          $push: { links: link._id },
        },
        { new: true, useFindAndModify: false }
      );
    } catch (e) {
      logger.error(
        e,
        `failed create link stats ${url} for username ${username}`
      );
    }
  }

  const date = new Date();
  date.setHours(1, 0, 0, 0);

  let getPlatformStats;
  try {
    getPlatformStats = await Stats.findOne({ date });
  } catch (e) {
    logger.error(e, `failed finding ${date} platform stats for ${username}`);
  }

  if (getPlatformStats) {
    try {
      await Stats.updateOne(
        {
          date,
        },
        {
          $inc: { clicks: 1 },
        }
      );
    } catch (e) {
      logger.error(
        e,
        `failed incrementing ${date} platform stats for ${username}`
      );
    }
  }

  if (!getPlatformStats) {
    try {
      await Stats.create({
        date,
        views: 0,
        clicks: 1,
        users: 0,
      });
    } catch (e) {
      logger.error(
        e,
        `failed creating platform stats on ${date} for ${username}`
      );
    }
  }

  let getLinkDailyStats;
  try {
    getLinkDailyStats = await LinkStats.findOne({ username, url, date });
  } catch (e) {
    logger.error(e, `failed finding link stats on ${date} for ${username}`);
  }

  if (getLinkDailyStats) {
    try {
      await LinkStats.updateOne(
        {
          username,
          date,
          url,
        },
        {
          $inc: { clicks: 1 },
        }
      );
    } catch (e) {
      logger.error(e, `failed incrementing platform stats for ${data}`);
    }
  }

  if (!getLinkDailyStats) {
    try {
      await LinkStats.create({
        username,
        url,
        date,
        clicks: 1,
      });
    } catch (e) {
      logger.error(e, `failed creating link stats on ${date} for ${username}`);
    }
  }

  return res.status(201).redirect(decodeURIComponent(url));
}
