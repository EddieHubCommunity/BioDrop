import { authOptions } from "../../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import connectMongo from "@config/mongo";
import logger from "@config/logger";
import Profile from "@models/Profile";

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

export async function getEventsApi(username) {
  await connectMongo();
  const log = logger.child({ username });

  let getEvents = [];
  try {
    const profile = await Profile.findOne({ username }).sort({
      date: 1,
    });
    getEvents = profile.events;
  } catch (e) {
    log.error(e, `failed to get events for username: ${username}`);
  }

  return JSON.parse(JSON.stringify(getEvents));
}
