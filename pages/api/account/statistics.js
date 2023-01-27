import { authOptions } from "../auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

import connectMongo from "../../../config/mongo";
import logger from "../../../config/logger";
import ProfileStats from "../../../models/ProfileStats";
import Link from "../../../models/Link";

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  const username = "eddiejaoude"; // TODO: session.username
  await connectMongo();

  let profileViews = [];
  try {
    profileViews = await ProfileStats.find({ username });
  } catch (e) {
    logger.error(e, "failed to load stats");
  }

  let totalViews = 0;
  const dailyStats = profileViews.map((item) => {
    totalViews += item.views;
    return {
      views: item.views,
      date: item.date,
    };
  });

  let linkClicks = [];
  try {
    linkClicks = await Link.find({ username });
  } catch (e) {
    logger.error(e, "failed to load stats");
  }

  let totalClicks = 0;
  const linkStats = linkClicks.map((item) => {
    totalClicks += item.clicks;
    return {
      url: item.url,
      clicks: item.clicks,
    };
  });

  const data = {
    profile: {
      views: totalViews,
      daily: dailyStats,
    },
    links: {
      clicks: totalClicks,
      individual: linkStats,
    },
  };

  res.status(200).json(data);
}
