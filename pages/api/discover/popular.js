import connectMongo from "../../../config/mongo";
import logger from "../../../config/logger";
import Profile from "../../../models/Profile";
import loadProfiles from "../../../services/profiles/loadProfiles";

export default async function handler(req, res) {
  await connectMongo();

  let profiles = [];
  try {
    profiles = await Profile.find({
      username: { $nin: process.env.SHADOWBAN.split(",") },
    })
      .sort({ views: -1 })
      .limit(20);
  } catch (e) {
    logger.error(e, "failed to load profiles");
  }

  if (profiles.length === 0) {
    return res.status(404).json([]);
  }

  const profilesWithStats = await loadProfiles(
    profiles.map((profile) => profile._doc)
  );

  const selectedPopularProfiles = profilesWithStats.slice(0, 5);
  res.status(200).json(selectedPopularProfiles);
}
