import { authOptions } from "../auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

import connectMongo from "../../../config/mongo";
import logger from "../../../config/logger";
import ProfileStats from "../../../models/ProfileStats";

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  console.log(session);
  await connectMongo();
  const { username } = req.query;
  console.log(username);
  let dailyStats = [];
  try {
    dailyStats = await ProfileStats.find({ username });
  } catch (e) {
    logger.error(e, "failed to load stats");
  }

  let views = 0;
  dailyStats.forEach((stat) => (views += stat.views));

  const data = {
    viewTotal: views,
    views: dailyStats,
  };

  res.status(200).json(data);
}
