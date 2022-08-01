import fs from "fs";
import path from "path";

import User from "../../../models/User";
import connectMongo from "../../../config/mongo";

export default async function handler(req, res) {
  await connectMongo();
  const { username } = req.query;

  const directoryPath = path.join(process.cwd(), "data");
  const files = fs.readdirSync(directoryPath);
  const file = files.find((file) => file === `${username}.json`);

  if (!file) {
    return res.status(404).json({ [username]: "Not found" });
  }

  const data = JSON.parse(
    fs.readFileSync(`${path.join(directoryPath, file)}`, "utf8")
  );

  let dbUser = [];
  const getUser = await User.findOne({ username });
  if (!getUser) {
    try {
      dbUser = await User.create({
        username,
        views: 1,
      });
    } catch (e) {
      console.log("ERROR creating user stats", e);
    }
  }
  if (getUser) {
    try {
      dbUser = await User.update(
        {
          username,
        },
        {
          $inc: { views: 1 },
        }
      );
    } catch (e) {
      console.log("ERROR incrementing user stats", e);
    }
  }
  const latestUser = await User.findOne({ username });

  data.links = data.links.map((link) => ({
    ...link,
    ...(latestUser.links
      ? latestUser.links.find((linkStats) => linkStats.url === link.url)
      : []),
  }));

  const profile = {
    username,
    views: latestUser.views,
    ...data,
  };

  res.status(200).json(profile);
}
