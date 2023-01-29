import { authOptions } from "../auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

import connectMongo from "../../../config/mongo";
import logger from "../../../config/logger";
import Profile from "../../../models/Profile";
import ProfileStats from "../../../models/ProfileStats";
import Link from "../../../models/Link";

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  if (req.method != "GET") {
    return res
      .status(400)
      .json({ error: "Invalid request: GET request required" });
  }

  await connectMongo();

  let profileData = {};
  try {
    profileData = await Profile.findOne({ username });
  } catch (e) {
    logger.error(e, "failed to load profile");
  }

  let profileViews = [];
  try {
    profileViews = await ProfileStats.find({ username }).sort({ views: -1 });
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
    linkClicks = await Link.find({ username }).sort({ clicks: -1 });
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
      total: profileData.views,
      monthly: totalViews,
      daily: dailyStats,
    },
    links: {
      clicks: totalClicks,
      individual: linkStats,
    },
  };

  res.status(200).json(data);
}
