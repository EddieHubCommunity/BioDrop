import { authOptions } from "../../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import connectMongo from "@config/mongo";
import logger from "@config/logger";
import Profile from "@models/Profile";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method !== "GET") {
    return res.status(400).json({ error: "Invalid request: GET required" });
  }

  const data = await getMilestonesApi(session.username);

  return res.status(200).json(data);
}

export async function getMilestonesApi(username) {
  await connectMongo();
  const log = logger.child({ username });

  let getMilestones = [];
  try {
    getMilestones = await Profile.aggregate([
      {
        $match: {
          username,
        },
      },
      {
        $unwind: "$milestones",
      },
      {
        $replaceRoot: {
          newRoot: "$milestones",
        },
      },
      {
        $sort: { date: -1 },
      },
    ]);
  } catch (e) {
    log.error(e, `failed to get milestones for username: ${username}`);
  }
  return JSON.parse(JSON.stringify(getMilestones));
}
