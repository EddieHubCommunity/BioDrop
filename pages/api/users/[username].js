import fs from "fs";
import path from "path";

import Profile from "../../../models/Profile";
import Link from "../../../models/Link";
import Stats from "../../../models/Stats";
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
    fs.readFileSync(path.join(directoryPath, file), "utf8")
  );

  const getProfile = await Profile.findOne({ username });
  if (!getProfile) {
    try {
      await Profile.create({
        username,
        views: 1,
      });
    } catch (e) {
      console.log("ERROR creating profile stats", e);
    }
  }
  if (getProfile) {
    try {
      await Profile.updateOne(
        {
          username,
        },
        {
          $inc: { views: 1 },
        }
      );
    } catch (e) {
      console.log("ERROR incrementing profile stats", e);
    }
  }

  const date = new Date();
  date.setHours(1, 0, 0, 0);

  const getPlatformStats = await Stats.findOne({ date });
  if (getPlatformStats) {
    try {
      await Stats.updateOne(
        {
          date,
        },
        {
          $inc: { views: 1 },
        }
      );
    } catch (e) {
      console.log("ERROR incrementing platform stats", e);
    }
  }

  if (!getPlatformStats) {
    try {
      await Stats.create({
        date,
        views: 1,
      });
    } catch (e) {
      console.log("ERROR creating platform stats", e);
    }
  }

  if (!data.displayStatsPublic) {
    return res.status(200).json({ username, ...data });
  }

  const latestProfile = await Profile.findOne({ username });
  const links = await Link.find({ profile: latestProfile._id });

  const profileWithStats = {
    username,
    ...data,
    views: latestProfile.views,
    links: data.links.map((link) => {
      const statFound = links.find((linkStats) => linkStats.url === link.url);
      if (statFound) {
        return {
          ...link,
          clicks: statFound.clicks,
        };
      }

      return link;
    }),
  };

  res.status(200).json(profileWithStats);
}
