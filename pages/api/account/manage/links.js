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

  const data = await getStats(session.username);

  return res.status(200).json(data);
}

export async function getLinksApi(username) {
  await connectMongo();
  const log = logger.child({ username });

  let getLinks = [];
  try {
    getLinks = await Link.find({ username });
  } catch (e) {
    log.error(
      e,
      `failed to get link for username: ${username} and url: ${url}`
    );
  }

  return JSON.parse(JSON.stringify(getLinks));
}
