import connectMongo from "@config/mongo";
import logger from "@config/logger";
import { Profile } from "@models/index";

export default async function handler(req, res) {
  if (req.method != "GET") {
    return res
      .status(400)
      .json({ error: "Invalid request: GET request required" });
  }

  await connectMongo();

  let profiles = [];
  try {
    profiles = await Profile.find({ name: { $exists: true } }, [
      "username",
      "name",
      "bio",
      "tags",
      "location",
    ]);
  } catch (e) {
    logger.error(e, "failed loading profiles");
    return profiles;
  }

  res.status(200).json(profiles);
}
