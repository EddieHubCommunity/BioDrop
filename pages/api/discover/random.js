import { serverEnv } from "@config/schemas/serverSchema";
import connectMongo from "@config/mongo";
import Profile from "@models/Profile";
import logger from "@config/logger";

export default async function handler(req, res) {
  if (req.method != "GET") {
    return res
      .status(400)
      .json({ error: "Invalid request: GET request required" });
  }

  let profile = {};
  try {
    profile = await getRandomProfileApi();

    res.status(200).json(profile);
  } catch (error) {
    logger.error(error, "Error fetching user profiles");
    res.status(500).json({ error: "Failed to fetch user profiles" });
  }
}

export async function getRandomProfileApi() {
  await connectMongo();
  if (!serverEnv.RANDOM_USERS) {
    return {};
  }

  const usernames = serverEnv.RANDOM_USERS.split(",");

  if (usernames.length === 0) {
    return {};
  }

  try {
    const profile = await Profile.aggregate([
      { $match: { username: { $in: usernames } } },
      { $sample: { size: 1 } },
      { $project: { username: 1, bio: 1, name: 1 } },
    ]).exec();

    return JSON.parse(JSON.stringify(profile ? profile[0] : {}));
  } catch (error) {
    if (serverEnv.NODE_ENV === "development") {
      logger.warn(
        "Users not loaded. Please visit /api/system/reload?secret=development",
      );
      return {};
    }
    logger.error(error, "Error fetching user profiles");
    return { error: "Failed to fetch user profiles" };
  }
}
