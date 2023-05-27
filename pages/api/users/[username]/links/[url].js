import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import connectMongo from "@config/mongo";
import logger from "@config/logger";
import { Link, LinkStats, Stats } from "@models/index";

export default async function handler(req, res) {
  await connectMongo();

  const { username, url } = req.query;
  const session = await getServerSession(req, res, authOptions);

  if (session && session.username === username) {
    return res.status(201).redirect(decodeURIComponent(url));
  }

  if (req.method != "GET") {
    return res
      .status(400)
      .json({ error: "Invalid request: GET request required" });
  }

  let link;
  const customError = `failed loading link ${url} for username: ${username}`;
  try {
    link = await Link.findOne({ username, url });
  } catch (e) {
    logger.error(e, customError);
    return res.status(404).json({ error: customError });
  }

  if (!link) {
    logger.error(customError);
    return res.status(404).json({ error: customError });
  }

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

  const date = new Date();
  date.setHours(1, 0, 0, 0);

  try {
    await Stats.updateOne(
      {
        date,
      },
      {
        $inc: { clicks: 1 },
      },
      { upsert: true }
    );
  } catch (e) {
    logger.error(
      e,
      `failed incrementing ${date} platform stats for ${username}`
    );
  }

  try {
    await Stats.updateOne(
      {
        date,
      },
      {
        $inc: { clicks: 1 },
      },
      { upsert: true }
    );
  } catch (e) {
    logger.error(
      e,
      `failed creating platform stats on ${date} for ${username}`
    );
  }

  try {
    await LinkStats.updateOne(
      {
        username,
        date,
        url,
      },
      {
        $inc: { clicks: 1 },
      },
      { upsert: true }
    );
  } catch (e) {
    logger.error(e, `failed incrementing platform stats for ${data}`);
  }

  return res.status(201).redirect(decodeURIComponent(url));
}
