import fs from "fs";
import path from "path";

import connectMongo from "../../../config/mongo";
import Profile from "../../../models/Profile";

export default async function handler(req, res) {
  await connectMongo();

  const directoryPath = path.join(process.cwd(), "data");
  const files = await fs.promises.readdir(directoryPath);

  const users = await Promise.all(
    files
      .filter((item) => item.includes("json"))
      .map(async (file) => {
        const filePath = path.join(directoryPath, file);
        try {
          const data = await fs.promises.readFile(filePath, "utf8");
          return {
            ...JSON.parse(data),
            username: file.split(".")[0],
          };
        } catch (e) {
          console.log(`ERROR loading profile "${filePath}"`);
          return null;
        }
      })
  );

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
