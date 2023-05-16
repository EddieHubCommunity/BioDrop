import connectMongo from "@config/mongo";
import logger from "@config/logger";
import findAllBasic from "@services/profiles/findAllBasic";
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
    profiles = await Profile.aggregate([{ $sample: { size: 5 } }]);
  } catch (e) {
    logger.error(e, "failed to load profiles");
  }

  if (profiles.length === 0) {
    return res.status(404).json([]);
  }

  const fullRandomProfiles = await findAllBasic(
    profiles.map((profile) => profile.username)
  );

  res.status(200).json(fullRandomProfiles);
}
