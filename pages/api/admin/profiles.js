import connectMongo from "@config/mongo";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import { serverEnv } from "@config/schemas/serverSchema";
import logger from "@config/logger";
import { Profile } from "@models/index";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({});
  }

  if (!["GET"].includes(req.method)) {
    return res.status(400).json({ error: "Invalid request: GET required" });
  }

  const username = session.username;

  if (!serverEnv.ADMIN_USERS.includes(username)) {
    return res.status(401).json({});
  }

  const { filter } = req.query;
  const profiles = await getProfiles(filter);

  res.status(200).json(profiles);
}
export async function getProfiles(filter = "recently updated") {
  await connectMongo();

  let profiles = [];
  if (filter === "recently updated") {
    try {
      profiles = await Profile.find({}).sort({ updatedAt: -1 }).limit(20);
    } catch (e) {
      logger.error(e, "failed loading profiles");
      return profiles;
    }
  }

  if (filter === "by rank") {
    try {
      profiles = await Profile.aggregate([
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
      ]).limit(20);
    } catch (e) {
      logger.error(e, "failed loading profiles");
      return profiles;
    }
  }

  return JSON.parse(JSON.stringify(profiles));
}
