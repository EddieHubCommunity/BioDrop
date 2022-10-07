import fs from "fs";
import path from "path";

import connectMongo from "../../../config/mongo";
import Profile from "../../../models/Profile";

export default async function handler(req, res) {
  await connectMongo();

  // TODO: get top 10 popular profiles
  const getProfiles = await Profile.find({});

  // check for db results
  if (getProfiles.length === 0) {
    return res.status(404).json({ Error: "No popular profiles found" });
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

    return user;
  });

  res.status(200).json(profiles);
}
