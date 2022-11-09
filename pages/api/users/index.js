import fs from "fs";
import path from "path";

import connectMongo from "../../../config/mongo";
import Profile from "../../../models/Profile";

export default async function handler(req, res) {
  await connectMongo();
  const directoryPath = path.join(process.cwd(), "data");
  const files = fs.readdirSync(directoryPath);

  const users = files.map((file) => ({
    ...JSON.parse(fs.readFileSync(path.join(directoryPath, file), "utf8")),
    username: file.split(".")[0],
  }));
  const getStats = await Profile.find({});

  // merge profiles with their profile views if set to public
  const profiles = users.map((user) => {
    const stats = getStats.find((stat) => stat.username === user.username);
    if (stats && user.displayStatsPublic) {
      return {
        ...user,
        ...stats._doc,
      };
    }

    return user;
  });

  res.status(200).json(profiles);
}
