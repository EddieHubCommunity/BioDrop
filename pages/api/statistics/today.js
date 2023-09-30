import connectMongo from "@config/mongo";
import logger from "@config/logger";

import { Stats } from "@models/index";

export default async function handler(req, res) {
  if (req.method != "GET") {
    return res
      .status(400)
      .json({ error: "Invalid request: GET request required" });
  }

  const { statusCode, stats } = await getTodayStats();
  return res.status(statusCode).json(stats);
}

export async function getTodayStats() {
  await connectMongo();
  const date = new Date();
  date.setHours(1, 0, 0, 0);

  let statsToday;
  try {
    statsToday = await Stats.findOne({
      date,
    });
  } catch (e) {
    logger.error(e, "failed to load stats");
  }

  if (!statsToday) {
    statsToday = {
      views: 0,
      clicks: 0,
      users: 0,
    };
  }

  return {
    statusCode: 200,
    stats: {
      views: statsToday.views || 0,
      clicks: statsToday.clicks || 0,
      users: statsToday.users || 0,
    },
  };
}
