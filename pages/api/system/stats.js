import connectMongo from "@config/mongo";
import logger from "@config/logger";
import Stats from "@models/Stats";
import { getStatsApi } from "../admin/stats";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(400).json({ error: "Get requests only" });
  }
  await connectMongo();

  const date = new Date();
  date.setHours(1, 0, 0, 0);

  const appStats = await getStatsApi();

  let dailyStats = {};
  try {
    dailyStats = await Stats.findOneAndUpdate(
      {
        date,
      },
      {
        totalProfiles: appStats.stats.profiles,
        jsonProfiles: appStats.stats.profilesUsingJson,
        formProfiles: appStats.stats.profilesUsingForms,
        disabledProfiles: appStats.stats.totalProfilesDisabled,
      },
      { upsert: true },
    );
  } catch (e) {
    logger.error(e, `failed adding daily stats on ${date} platform stats`);
  }

  return res.status(200).json(dailyStats);
}
