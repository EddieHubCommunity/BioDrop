import { authOptions } from "../../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import connectMongo from "@config/mongo";
import logger from "@config/logger";
import Profile from "@models/Profile";

export default async function handler(req, res) {
  const allowedRequests = ["GET", "PUT", "DELETE"];
  if (!allowedRequests.includes(req.method)) {
    return res.status(400).json({
      error: `Invalid request: ${allowedRequests.join(",")} required`,
    });
  }

  const session = await getServerSession(req, res, authOptions);
  const username = session.username;

  await connectMongo();
  const log = logger.child({ username });

  let getProfile = await Profile.findOne({ username });
  if (!getProfile) {
    return res.status(400).json({ error: "Profile not found" });
  }

  if (getProfile) {
    try {
      await Profile.updateOne(
        {
          username,
        },
        {
          source: req.body.source,
          name: req.body.name,
          bio: req.body.bio,
        }
      );
      log.info(`profile updated for username: ${username}`);
    } catch (e) {
      log.error(e, `failed to update profile for username: ${username}`);
    }
  }

  const { status, profile } = await getUserApi(req, res, username);
  return res.status(status).json(profile);
}
