import connectMongo from "@config/mongo";
import logger from "@config/logger";

import { Changelog, Profile, User } from "@models/index";

export default async function handler(req, res) {
  if (!["GET"].includes(req.method)) {
    return res.status(400).json({ error: "Invalid request: GET required" });
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

  let totalPremiumProfiles = 0;
  try {
    totalPremiumProfiles = await User.countDocuments({
      type: "premium",
    });
  } catch (e) {
    logger.error(e, "failed to load totalPremiumProfiles profiles");
  }

  let totalChangelogs = 0;
  try {
    totalChangelogs = await Changelog.countDocuments({});
  } catch (e) {
    logger.error(e, "failed to load totalChangelogs");
  }

  return {
    statusCode: 200,
    stats: {
      profiles: totalProfiles || 0,
      profilesUsingJson: totalProfilesUsingJson || 0,
      profilesUsingForms: totalProfilesUsingForms || 0,
      totalProfilesDisabled: totalProfilesDisabled || 0,
      totalPremiumProfiles: totalPremiumProfiles || 0,
      totalChangelogs: totalChangelogs || 0,
    },
  };
}
