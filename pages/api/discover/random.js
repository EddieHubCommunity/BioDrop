import fs from "fs";
import path from "path";

import connectMongo from "../../../config/mongo";
import Profile from "../../../models/Profile";

export default async function handler(req, res) {
  await connectMongo();

  // get random profiles
  const randomProfiles = await Profile.aggregate([{ $sample: { size: 5 } }]);

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
      console.log(`ERROR loading profile "${filePath}"`);
      return [];
    }
  });

  res.status(200).json(fullRandomProfiles);
}
