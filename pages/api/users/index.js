import connectMongo from "../../../config/mongo";
import logger from "../../../config/logger";
import Profile from "../../../models/Profile";
import findAllBasic from "../../../services/profiles/findAllBasic";

export default async function handler(req, res) {
  if (req.method != "GET") {
    return res
      .status(400)
      .json({ error: "Invalid request: GET request required" });
  }

  await connectMongo();

  const fileProfiles = findAllBasic();

  let dbProfiles = [];
  try {
    dbProfiles = await Profile.find({ location: { $ne: null } });
  } catch (e) {
    logger.error(e, "failed loading profile from db");
    return fileProfiles;
  }

  const profiles = fileProfiles.map((fileProfile) => {
    const profile = dbProfiles.find(
      (dbProfile) => dbProfile.username === fileProfile.username
    );
    if (profile && profile._doc.location.name !== "unknown") {
      return {
        ...fileProfile,
        location: profile._doc.location,
      };
    }
    return fileProfile;
  });

  res.status(200).json(profiles);
}
