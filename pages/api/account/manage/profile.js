import { authOptions } from "../../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import connectMongo from "@config/mongo";
import logger from "@config/logger";
import Profile from "@models/Profile";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(400).json({ error: "Invalid request: PUT required" });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  const username = session.username;

  await connectMongo();
  const log = logger.child({ username });

  let profile = {};
  try {
    profile = await Profile.findOneAndUpdate(
      { username },
      {
        customise: {
          hideNavbar: req.body.customise.hideNavbar,
          hideFooter: req.body.customise.hideFooter,
        },
      },
      { upsert: true, new: true }
    );
    log.info(`profile update for username: ${username}`);
  } catch (e) {
    log.error(e, `failed to update profile settings for username: ${username}`);
  }

  return res.status(200).json(profile);
}
