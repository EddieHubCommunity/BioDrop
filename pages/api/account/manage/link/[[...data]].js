import { authOptions } from "../../../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import connectMongo from "@config/mongo";
import logger from "@config/logger";
import Link from "@models/Link";
import Profile from "@models/Profile";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }
  const username = session.username;
  if (!["GET", "PUT"].includes(req.method)) {
    return res
      .status(400)
      .json({ error: "Invalid request: GET or PUT required" });
  }

  const { data } = req.query;

  let link = {};
  if (req.method === "GET") {
    link = await getLinkApi(username, data[0]);
  }
  if (req.method === "PUT") {
    link = await updateLinkApi(username, data[0], req.body);
  }

  if (link.error) {
    return res.status(404).json({ message: link.error });
  }
  return res.status(200).json(link);
}

export async function getLinkApi(username, url) {
  await connectMongo();
  const log = logger.child({ username });

  let getLink = await Link.findOne({ username, url });

  if (!getLink) {
    log.info(`link ${url} not found for username: ${username}`);
    return { error: "Link not found." };
  }

  return JSON.parse(JSON.stringify(getLink));
}

export async function updateLinkApi(username, url, data) {
  await connectMongo();
  const log = logger.child({ username });

  let getLink = {};
  try {
    getLink = await Link.findOneAndUpdate(
      {
        username,
        url,
      },
      {
        group: data.group,
        name: data.name,
        url: data.url,
        icon: data.icon,
        isEnabled: data.isEnabled,
        isPinned: data.isPinned,
      },
      { upsert: true }
    );

    if (!getLink) {
      log.info(`link ${url} created for username: ${username}`);
      getLink = await Link.findOne({
        username,
        url,
      });
      await Profile.findOneAndUpdate(
        { username },
        {
          $push: { links: getLink._id },
        },
        { upsert: true, new: true }
      );
    } else {
      log.info(`link ${url} updated for username: ${username}`);
    }
  } catch (e) {
    log.error(e, `failed to update link ${url} for username: ${username}`);
  }

  return JSON.parse(JSON.stringify(getLink));
}
