import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import { serverEnv } from "@config/schemas/serverSchema";
import connectMongo from "@config/mongo";
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

  const { statusCode, stats } = await getStatsApi();
  return res.status(statusCode).json(stats);
}

export async function getStatsApi() {
  await connectMongo();

  let totalProfiles = 0;
  try {
    totalProfiles = await Profile.estimatedDocumentCount();
  } catch (e) {
    logger.error(e, "failed to load profile total");
  }

  let totalProfilesUsingJson = 0;
  try {
    totalProfilesUsingJson = await Profile.countDocuments({
      source: "file",
    });
  } catch (e) {
    logger.error(e, "failed to load profiles using json");
  }

  let totalProfilesUsingForms = 0;
  try {
    totalProfilesUsingForms = await Profile.countDocuments({
      source: "database",
    });
  } catch (e) {
    logger.error(e, "failed to load profiles using forms");
  }

  let totalProfilesDisabled = 0;
  try {
    totalProfilesDisabled = await Profile.countDocuments({
      isEnabled: false,
    });
  } catch (e) {
    logger.error(e, "failed to load isEnabled false profiles");
  }

  return {
    statusCode: 200,
    stats: {
      profiles: totalProfiles || 0,
      profilesUsingJson: totalProfilesUsingJson || 0,
      profilesUsingForms: totalProfilesUsingForms || 0,
      totalProfilesDisabled: totalProfilesDisabled || 0,
    },
  };
}
