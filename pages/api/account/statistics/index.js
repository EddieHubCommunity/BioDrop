import { authOptions } from "../../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import connectMongo from "@config/mongo";
import logger from "@config/logger";
import { Profile, ProfileStats, Link, LinkStats } from "@models/index";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method != "GET") {
    return res
      .status(400)
      .json({ error: "Invalid request: GET request required" });
  }

  const data = await getStats(session.username);

  res.status(200).json(data);
}

export async function getStats(username, numberOfDays = 30) {
  await connectMongo();

  const profileData = await getRank(username);
  const dailyStats = await getProfileViewsPerDay(username, numberOfDays);
  const linkStats = await getLinkStats(username);

  const data = {
    profile: {
      total: profileData.views,
      monthly: dailyStats.reduce((acc, day) => acc + day.views, 0),
      daily: dailyStats,
      rank: profileData.rank,
    },
    links: linkStats,
  };

  return JSON.parse(JSON.stringify(data));
}

export async function getRank(username) {
  await connectMongo();

  let profileData = {};
  try {
    const rankedProfiles = await Profile.aggregate([
      {
        $setWindowFields: {
          sortBy: { views: -1 },
          output: {
            rank: {
              $rank: {},
            },
          },
        },
      },
      {
        $match: {
          username: username,
        },
      },
    ]);

    profileData = rankedProfiles[0];
  } catch (e) {
    logger.error(e, "failed to load profile");
  }

  return { views: profileData.views, rank: profileData.rank };
}
export async function getProfileViewsPerDay(username, numberOfDays = 30) {
  await connectMongo();

  // This calculates the start date by subtracting the specified number of days from the current date.
  // The query then retrieves data from that calculated start date up to the current date.
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - numberOfDays);

  let profileViews = [];
  try {
    profileViews = await ProfileStats.find({
      username,
      date: { $gte: startDate },
    }).sort({ date: "asc" });
  } catch (e) {
    logger.error(e, "failed to load stats");
  }

  let dailyStats = [];
  for (let day = 0; day < numberOfDays; day++) {
    const date = new Date();
    date.setDate(date.getDate() - numberOfDays + day);
    const result = profileViews.find(
      (result) => result.date.toDateString() === date.toDateString(),
    );
    if (result) {
      dailyStats.push(result);
    } else {
      dailyStats.push({ date, views: 0 });
    }
  }

  return dailyStats;
}

export async function getLinkStats(username) {
  await connectMongo();

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
      _id: item._id,
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

  return {
    clicks: totalClicks,
    individual: linkDailyStats,
  };
}
