import fs from "fs";
import path from "path";

import Stats from "../../../models/Stats";
import Profile from "../../../models/Profile";
import connectMongo from "../../../config/mongo";

export default async function handler(req, res) {
  await connectMongo();
  let dailyStats = await Stats.find({});

  let views = 0;
  let clicks = 0;
  dailyStats.map((stat) => {
    views += stat.views;
    clicks += stat.clicks;
  });

  const activeProfiles = await Profile.find({}).estimatedDocumentCount();

  const directoryPath = path.join(process.cwd(), "data");
  const totalProfiles = fs
    .readdirSync(directoryPath)
    .filter((item) => item.includes("json"));

  const data = {
    views,
    clicks,
    users: totalProfiles.length || 0,
    active: activeProfiles || 0,
  };

  res.status(200).json(data);
}
