import fs from "fs";
import path from "path";

import Link from "../../../../../models/Link";
import Profile from "../../../../../models/Profile";
import Stats from "../../../../../models/Stats";
import connectMongo from "../../../../../config/mongo";

export default async function handler(req, res) {
  await connectMongo();

  const { username, url } = req.query;

  if (req.method != "GET") {
    return res
      .status(400)
      .json({ error: "Invalid request: GET request required" });
  }

  // load profile json file and check link
  const filePath = path.join(process.cwd(), "data", `${username}.json`);
  let data = {};
  try {
    data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (e) {
    console.log(`ERROR loading username ${username}`, e);
    return res.status(404).json({ error: `ERROR ${username} not found` });
  }

  if (
    !data.links.find((link) => link.url === url) &&
    !data.socials.find((social) => social.url === url)
  ) {
    console.log(`ERROR link ${url} not found for username ${username}`);
    return res.status(404).json({ error: `ERROR ${url} not found` });
  }

  let getProfile = await Profile.findOne({ username });

  if (!getProfile) {
    return res.status(404).json({ error: `ERROR ${username} not found` });
  }

  const getLink = await Link.findOne({ username, url });
  if (getLink) {
    try {
      await Link.updateOne(
        {
          username,
          url,
        },
        {
          $inc: { clicks: 1 },
        }
      );
    } catch (e) {
      console.log(
        `ERROR incrementing link: ${url} for username ${username}`,
        e
      );
    }
  }

  if (!getLink) {
    try {
      const link = await Link.create({
        profile: getProfile._id,
        username,
        url,
        clicks: 1,
      });

      await Profile.updateOne(
        {
          username,
        },
        {
          $push: { links: link._id },
        },
        { new: true, useFindAndModify: false }
      );
    } catch (e) {
      console.log(
        `ERROR creating link stats: ${url} for username ${username}`,
        e
      );
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
          $inc: { clicks: 1 },
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
        views: 0,
        clicks: 1,
        users: 0,
      });
    } catch (e) {
      console.log("ERROR creating platform stats", e);
    }
  }

  return res.status(201).redirect(decodeURIComponent(url));
}
