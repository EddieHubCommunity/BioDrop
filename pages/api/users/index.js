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

  let fileProfiles = findAllBasic();
  let { initialRandomUsers, keywords } = req.query;

  initialRandomUsers = initialRandomUsers === "true";
  const keywordsArray = keywords?.split(",") || [];

  let dbProfiles = [];
  try {
    dbProfiles = await Profile.find({ location: { $ne: null } });
  } catch (e) {
    logger.error(e, "failed loading profile from db");
    return fileProfiles;
  }

  if (initialRandomUsers) {
    let randomMin =
      Math.floor(Math.random() * (fileProfiles.length - 5 - 0 + 1)) + 0;
    fileProfiles = fileProfiles.slice(randomMin, randomMin + 5);
  }

  let profiles = fileProfiles.map((fileProfile) => {
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

  if (keywordsArray.length > 0) {
    profiles = profiles.filter((user) => {
      if (user.name.toLowerCase().includes(req.query.keywords)) {
        return true;
      }
      if (user.username.toLowerCase().includes(req.query.keywords)) {
        return true;
      }

      let userTags = user.tags?.map((tag) => tag.toLowerCase());

      if (keywordsArray.every((keyword) => userTags?.includes(keyword))) {
        return true;
      }

      return false;
    });
  }

  res.status(200).json(profiles);
}
