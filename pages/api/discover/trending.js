import path from "path";

import connectMongo from "../../../config/mongo";
import ProfileStats from "../../../models/ProfileStats";
import {
  memoizedReadAndParseJsonFile,
  filterEmptyObjects,
} from "../../../utils";

export default async function handler(req, res) {
  await connectMongo();

  const getProfiles = await ProfileStats.aggregate([
    {
      $match: {
        date: {
          $gte: new Date(new Date().setDate(new Date().getDate() - 1)),
        },
      },
    },
    {
      $group: {
        _id: "$profile",
        username: { $first: "$username" },
        views: {
          $sum: "$views",
        },
      },
    },
    {
      $sort: {
        views: -1,
      },
    },
    {
      $limit: 20,
    },
  ]);

  // check for db results
  if (getProfiles.length === 0) {
    return res.status(404).json([]);
  }

  const directoryPath = path.join(process.cwd(), "data");

  // merge profiles with their profile views if set to public
  const profiles = await Promise.all(
    getProfiles.flatMap(async (profile) => {
      const filePath = path.join(directoryPath, `${profile.username}.json`);
      try {
        const user = await memoizedReadAndParseJsonFile(filePath);

        if (user.displayStatsPublic) {
          return {
            ...user,
            ...profile,
          };
        }

        return {};
      } catch (e) {
        console.log(`ERROR loading profile "${filePath}"`);
        return {};
      }
    })
  );
  const filteredProfiles = filterEmptyObjects(profiles);
  const slicedProfiles = filteredProfiles.slice(0, 5);
  res.status(200).json(slicedProfiles);
}
