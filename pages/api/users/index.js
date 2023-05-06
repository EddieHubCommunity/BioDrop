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

    const basicProfile = {
      username: fileProfile.username,
      name: fileProfile.name,
      bio: fileProfile.bio,
      tags: fileProfile.tags,
    };

    if (profile && profile._doc.location.name !== "unknown") {
      return {
        ...basicProfile,
        location: profile._doc.location,
      };
    }
    return basicProfile;
  });

  res.status(200).json(profiles);
}
