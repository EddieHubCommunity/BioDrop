import path from "path";

import connectMongo from "../../../config/mongo";
import Profile from "../../../models/Profile";
import { readAndParseJsonFile } from "../../../utils";

export default async function handler(req, res) {
  await connectMongo();

  // get random profiles
  const randomProfiles = await Profile.aggregate([{ $sample: { size: 5 } }]);

  if (randomProfiles.length === 0) {
    return res.status(404).json([]);
  }

  const directoryPath = path.join(process.cwd(), "data");
  const fullRandomProfiles = await Promise.all(
      randomProfiles.flatMap(async (profile) => {
      const filePath = path.join(directoryPath, `${profile.username}.json`);
      try {
        const user = await readAndParseJsonFile(filePath);

        return { ...user, username: profile.username };
      } catch (e) {
        console.log(`ERROR loading profile "${filePath}"`);
        return {};
      }
    })
  );

  res.status(200).json(fullRandomProfiles);
}
