import connectMongo from "@config/mongo";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import { serverEnv } from "@config/schemas/serverSchema";
import logger from "@config/logger";
import { Profile } from "@models/index";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({});
  }

  if (!["GET"].includes(req.method)) {
    return res.status(400).json({ error: "Invalid request: GET required" });
  }

  const username = session.username;

  if (!serverEnv.ADMIN_USERS.includes(username)) {
    return res.status(401).json({});
  }

  const profiles = await getProfiles();

  res.status(200).json(profiles);
}
export async function getProfiles() {
  await connectMongo();

  let profiles = [];
  try {
    profiles = await Profile.find({}).sort({ updatedAt: -1 }).limit(10);
  } catch (e) {
    logger.error(e, "failed loading profiles");
    return profiles;
  }

  return JSON.parse(JSON.stringify(profiles));
}
