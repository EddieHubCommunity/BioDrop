import { authOptions } from "../../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import connectMongo from "@config/mongo";
import logger from "@config/logger";
import Profile from "@models/Profile";
import { getUserApi } from "pages/api/profiles/[username]";

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

  try {
    await Profile.findOneAndUpdate(
      { username },
      {
        source: "database",
        name: req.body.name,
        bio: req.body.bio,
        tags: req.body.tags,
      },
      { upsert: true }
    );
    log.info(`profile created for username: ${username}`);
  } catch (e) {
    log.error(e, `failed to create profile stats for username: ${username}`);
  }

  const { status, profile } = await getUserApi(req, res, username);
  return res.status(status).json(profile);
}
