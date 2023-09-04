import { authOptions } from "../../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import connectMongo from "@config/mongo";
import logger from "@config/logger";
import Profile from "@models/Profile";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  const username = session.username;
  if (!["GET", "PATCH"].includes(req.method)) {
    return res
      .status(400)
      .json({ error: "Invalid request: GET or PUT required" });
  }

  let profile = {};
  if (req.method === "GET") {
    profile = await getSettingsApi(username);
  }
  if (req.method === "PATCH") {
    profile = await updateSettingsApi(username, req.body);
  }

  if (profile.error) {
    return res.status(400).json({ message: profile.error });
  }
  return res.status(200).json(profile);
}

export async function getSettingsApi(username) {
  await connectMongo();
  const log = logger.child({ username });

  let getProfile = await Profile.findOne({ username }, ["settings"]);

  if (!getProfile) {
    log.info(`peofile not found for username: ${username}`);
    return { error: "Profile not found." };
  }

  return JSON.parse(JSON.stringify(getProfile.settings));
}

export async function updateSettingsApi(username, data) {
  await connectMongo();
  const log = logger.child({ username });

  let getProfile = {};
  try {
    await Profile.validate({ data }, ["settings"]);
  } catch (e) {
    return { error: e.errors };
  }

  try {
    getProfile = await Profile.findOneAndUpdate(
      { username },
      { source: "database", settings: data },
      {
        upsert: true,
        new: true,
      }
    );
    log.info(`profile premium settings updated for username: ${username}`);
  } catch (e) {
    log.error(e, `failed to updated profile premium for username: ${username}`);
  }

  return JSON.parse(JSON.stringify(getProfile.settings));
}
