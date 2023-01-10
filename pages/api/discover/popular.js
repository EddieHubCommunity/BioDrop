import path from "path";

import connectMongo from "../../../config/mongo";
import Profile from "../../../models/Profile";
import {
  memoizedReadAndParseJsonFile,
  filterEmptyObjects,
} from "../../../utils";

export default async function handler(req, res) {
  await connectMongo();

  // get popular profiles
  const popularProfiles = await Profile.find({}).sort({ views: -1 }).limit(20);

  if (popularProfiles.length === 0) {
    return res.status(404).json([]);
  }

  const directoryPath = path.join(process.cwd(), "data");

  const fullPopularProfiles = await Promise.all(
    popularProfiles.flatMap(async (profile) => {
      const filePath = path.join(directoryPath, `${profile.username}.json`);
      try {
        const user = await memoizedReadAndParseJsonFile(filePath);

        if (user.displayStatsPublic) {
          return {
            ...user,
            ...profile._doc,
          };
        }

        return {};
      } catch (e) {
        console.log(`ERROR loading profile "${filePath}"`);
        return {};
      }
    })
  );

  // Filter out the empty objects
  const filteredPopularProfiles = filterEmptyObjects(fullPopularProfiles);
  const selectedPopularProfiles = filteredPopularProfiles.slice(0, 5);
  res.status(200).json(selectedPopularProfiles);
}
