import logger from "@config/logger";
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
export async function getTags() {
  let tags = [];
  try {
    tags = await Profile.aggregate([
      { $match: { tags: { $exists: true } } },
      {
        $unwind: "$tags",
      },
      {
        $group: {
          _id: "$tags",
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
