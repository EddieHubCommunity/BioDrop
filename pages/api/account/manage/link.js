import { authOptions } from "../../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import connectMongo from "@config/mongo";
import logger from "@config/logger";
import Link from "@models/Link";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }
  const username = session.username;

  if (["GET", "PUT"].includes(req.method)) {
    return res
      .status(400)
      .json({ error: "Invalid request: GET or PUT required" });
  }

  const { url } = req.query;
  if (!url || url === "") {
    return res.status(400).json({ error: "Invalid request parameters" });
  }

  const data = await getLinkApi(req.method, username, url);

  return res.status(200).json(data);
}

export async function getLinkApi(type, username, url) {
  await connectMongo();
  const log = logger.child({ username });

  let getLink = await Link.findOne({ username, url });

  if (!getLink) {
    return res.status(404).json({ error: "Link not found" });
  }

  if (type === "GET") {
    return JSON.parse(JSON.stringify(getLink));
  }

  try {
    getLink = await getLink.updateOne(
      {
        username,
        url: req.body.url,
      },
      {
        group: req.body.group,
        name: req.body.name,
        url: req.body.url,
        icon: req.body.icon,
        isEnabled: req.body.isEnabled,
        isPinned: req.body.isPinned,
      },
      { upsert: true, new: true }
    );
    log.info(`link ${req.body.url} updated for username: ${username}`);
  } catch (e) {
    log.error(
      e,
      `failed to update link ${req.body.url} for username: ${username}`
    );
  }

  return JSON.parse(JSON.stringify(getLink));
}
