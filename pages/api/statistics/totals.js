import fs from "fs";
import path from "path";

import connectMongo from "../../../config/mongo";
import logger from "../../../config/logger";
import Profile from "../../../models/Profile";
import Stats from "../../../models/Stats";

export default async function handler(req, res) {
  await connectMongo();

  let dailyStats = [];
  try {
    dailyStats = await Stats.find({});
  } catch (e) {
    logger.error(e, "failed to load stats");
  }

  let views = 0;
  let clicks = 0;
  dailyStats.forEach((stat) => {
    views += stat.views;
    clicks += stat.clicks;
  });

  let activeProfiles = 0;
  try {
    activeProfiles = await Profile.find({}).estimatedDocumentCount();
  } catch (e) {
    logger.error(e, "failed to load profile statistics");
  }

  const directoryPath = path.join(process.cwd(), "data");
  let totalProfiles = [];
  try {
    totalProfiles = fs
      .readdirSync(directoryPath)
      .filter((item) => item.includes("json"));
  } catch (e) {
    logger.error(e, "failed to load profile list");
  }

  const data = {
    views,
    clicks,
    users: totalProfiles.length || 0,
    active: activeProfiles || 0,
  };

  res.status(200).json(data);
}
