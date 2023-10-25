import connectMongo from "@config/mongo";
import logger from "@config/logger";
import { Profile } from "@models/index";

export default async function handler(req, res) {
  if (req.method != "GET") {
    return res
      .status(400)
      .json({ error: "Invalid request: GET request required" });
  }

  const profiles = await getProfiles();

  res.status(200).json(profiles);
}
export async function getProfiles(options = {}) {
  await connectMongo();

  let profiles = [];
  const { cards } = { cards: false, ...options };
  const fields = cards
    ? ["username", "name", "bio", "tags", "-_id"]
    : ["username", "name", "bio", "tags", "location", "-_id"];
  try {
    profiles = await Profile.find(
      {
        name: { $exists: true },
        isEnabled: true,
        $or: [
          { isShadowBanned: { $exists: false } },
          { isShadowBanned: { $eq: false } },
        ],
      },
      fields,
    );
  } catch (e) {
    logger.error(e, "failed loading profiles");
    return profiles;
  }

  return JSON.parse(JSON.stringify(profiles));
}
