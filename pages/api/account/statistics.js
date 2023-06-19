import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import connectMongo from "@config/mongo";
import logger from "@config/logger";
import { Profile, ProfileStats, Link, LinkStats } from "@models/index";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  if (req.method != "GET") {
    return res
      .status(400)
      .json({ error: "Invalid request: GET request required" });
  }

  const data = await getStats(session.username)

  res.status(200).json(data);
}

export async function getStats(username) {
  await connectMongo();

  let profileData = {};
  try {
    profileData = await Profile.findOne({ username });
  } catch (e) {
    logger.error(e, "failed to load profile");
  }

  let profileViews = [];
  try {
    profileViews = await ProfileStats.find({ username }).sort({ date: "asc" });
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

  let dailyClicks = [];
  try {
    dailyClicks = await LinkStats.find({ username }).sort({
      date: "asc",
    });
  } catch (e) {
    logger.error(e, `failed to load url stats for ${username}`);
  }

  let totalClicks = 0;
  const linkDailyStats = linkClicks.map((item) => {
    totalClicks += item.clicks;

    return {
      url: item.url,
      clicks: item.clicks,
      daily: dailyClicks
        .filter((link) => link.url === item.url)
        .map((stat) => ({
          clicks: stat.clicks,
          date: stat.date,
        })),
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
      individual: linkDailyStats,
    },
  };

  return JSON.parse(JSON.stringify(data));
}
