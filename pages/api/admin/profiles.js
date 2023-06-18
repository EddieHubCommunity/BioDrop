import connectMongo from "@config/mongo";
import logger from "@config/logger";
import { Profile } from "@models/index";

export default async function handler(req, res) {
  if (req.method != "GET") {
    return res
      .status(400)
      .json({ error: "Invalid request: GET request required" });
  }

  const { status, profiles } = await getProfilesApi();

  res.status(status).json(profiles);
}

export async function getProfilesApi() {
  await connectMongo();

  let profiles = [];
  try {
    profiles = await Profile.find({}).limit(10);
  } catch (e) {
    logger.error(e, "failed loading profiles");
    return profiles;
  }

  profiles = profiles.map((profile) => ({
    ...profile._doc,
    avatar: `https://github.com/${profile.username}.png`,
  }));

  return JSON.parse(JSON.stringify({ status: 200, profiles }));
}
