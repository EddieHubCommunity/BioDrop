import fs from "fs";
import path from "path";

import connectMongo from "@config/mongo";
import logger from "@config/logger";

import Profile from "@models/Profile";
import Link from "@models/Link";

export default async function findOneByUsername(username) {
  await connectMongo();

  const filePath = path.join(process.cwd(), "data", `${username}.json`);
  let data = {};
  let available = [];
  try {
    data = {
      ...JSON.parse(fs.readFileSync(filePath, "utf8")),
      username,
    };
    available.push("file");
  } catch (e) {
    logger.error(e, `failed loading profile username: ${username}`);
  }

  let getProfile = await Profile.findOne({ username });
  let getLinks = await Link.find({ username });

  if (getProfile && getProfile.source) {
    available.push("database");
    if (getProfile.source === "database" || !data.username) {
      return {
        sources: { available, current: "database" },
        ...getProfile._doc,
        links: getLinks.map((link) => ({
          name: link._doc.name,
          url: link._doc.url,
          icon: link._doc.icon,
        })),
      };
    }
  }

  return { sources: { available, current: "file" }, ...data };
}
