import fs from "fs";
import path from "path";

import connectMongo from "../../../config/mongo";
import Profile from "../../../models/Profile";

export default async function handler(req, res) {
  await connectMongo();

  const getProfiles = await Profile.find({}).sort({ views: -1 }).limit(10);

  // check for db results
  if (getProfiles.length === 0) {
    return res.status(404).json([]);
  }

  const directoryPath = path.join(process.cwd(), "data");

  // merge profiles with their profile views if set to public
  const profiles = getProfiles.map((profile) => {
    const user = JSON.parse(
      fs.readFileSync(
        path.join(directoryPath, `${profile.username}.json`),
        "utf8"
      )
    );

    if (user.displayStatsPublic) {
      return {
        ...user,
        ...profile._doc,
      };
    }

    return { ...user, username: profile.username };
  });

  res.status(200).json(profiles);
}
