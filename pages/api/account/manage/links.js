import { authOptions } from "../../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import connectMongo from "@config/mongo";
import logger from "@config/logger";
import Link from "@models/Link";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json([]);
    return;
  }

  if (req.method !== "GET") {
    return res.status(400).json({ error: "Invalid request: GET required" });
  }

  const username = session.username;

  await connectMongo();
  const log = logger.child({ username });

  try {
    const getLinks = await Link.find({ username });
    return res.status(200).json(getLinks);
  } catch (e) {
    log.error(
      e,
      `failed to get link for username: ${username} and url: ${url}`
    );
  }

  return res.status(404).json([]);
}
