import connectMongo from "@config/mongo";

import logger from "@config/logger";
import { Profile } from "@models/index";

export default async function handler(req, res) {
  if (!["GET"].includes(req.method)) {
    return res.status(400).json({ error: "Invalid request: GET required" });
  }
  const { filter } = req.query;
  const profiles = await getProfiles(filter);

  res.status(200).json(profiles);
}
export async function getProfiles(filter = "recently updated", limit = 100) {
  await connectMongo();

  let profiles = [];
  if (filter === "recently updated") {
    try {
      profiles = await Profile.find({}).sort({ updatedAt: -1 }).limit(limit);
    } catch (e) {
      logger.error(e, "failed loading profiles");
      return profiles;
    }
  }

  if (filter === "premium") {
    try {
      profiles = await Profile.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $match: {
            "user.type": "premium",
          },
        },
      ]).limit(limit);
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
      ]).limit(limit);
    } catch (e) {
      logger.error(e, "failed loading profiles");
      return profiles;
    }
  }
  if (filter === "isShadowBanned") {
    try {
      profiles = await Profile.find({ isShadowBanned: true })
        .sort({ updatedAt: -1 })
        .limit(limit);
    } catch (e) {
      logger.error(e, "failed loading profiles");
      return profiles;
    }
  }

  return JSON.parse(JSON.stringify(profiles));
}
