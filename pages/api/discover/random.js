import fs from "fs";
import path from "path";

import connectMongo from "../../../config/mongo";
import logger from "../../../config/logger";
import Profile from "../../../models/Profile";

export default async function handler(req, res) {
  await connectMongo();

  let randomProfiles = [];
  try {
    randomProfiles = await Profile.aggregate([{ $sample: { size: 5 } }]);
  } catch (e) {
    logger.error(e, "failed to load profiles");
  }

  if (randomProfiles.length === 0) {
    return res.status(404).json([]);
  }

  const directoryPath = path.join(process.cwd(), "data");
  const fullRandomProfiles = randomProfiles.flatMap((profile) => {
    const filePath = path.join(directoryPath, `${profile.username}.json`);
    try {
      const user = JSON.parse(fs.readFileSync(filePath, "utf8"));

      return { ...user, username: profile.username };
    } catch (e) {
      logger.error(e, `failed to get load profiles: ${filePath}`);
      return [];
    }
  });

  res.status(200).json(fullRandomProfiles);
}
