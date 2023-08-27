import logger from "@config/logger";
import connectMongo from "@config/mongo";
import Profile from "@models/Profile";

export default async function handler(req, res) {
  if (req.method != "GET") {
    return res
      .status(400)
      .json({ error: "Invalid request: GET request required" });
  }

  const tags = await getTags();
  res.status(200).json(tags);
}
export async function getTags(location = false) {
  await connectMongo();
  let tags = [];

  const matchQuery = location
    ? {
        $match: {
          tags: { $exists: true },
          "location.provided": {
            $exists: true,
            $nin: [null, "unknown", "remote"],
          },
          "location.name": { $ne: "unknown" },
        },
      }
    : { $match: { tags: { $exists: true } } };

  try {
    tags = await Profile.aggregate([
      matchQuery,
      {
        $unwind: "$tags",
      },
      {
        $group: {
          _id: { $toLower: "$tags" },
          total: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          total: 1,
        },
      },
      {
        $sort: { total: -1 },
      },
    ]).exec();
  } catch (e) {
    logger.error(e, "Failed to load events");
    tags = [];
  }

  return tags;
}
