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

  if (req.method !== "PUT") {
    return res.status(400).json({ error: "Invalid request: PUT required" });
  }

  const username = session.username;

  await connectMongo();
  const log = logger.child({ username });

  let getLink = await Link.findOne({ username, url: req.body.url });

  let link = {};
  try {
    link = await getLink.updateOne(
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

  return res.status(200).json(link);
}
