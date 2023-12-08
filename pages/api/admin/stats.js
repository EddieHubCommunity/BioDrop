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

  let totalCustomDomains = 0;
  try {
    totalCustomDomains = await Profile.countDocuments({
      "settings.domain": { $exists: true, $ne: "" },
    });
  } catch (e) {
    logger.error(e, "failed to load totalCustomDomains profiles");
  }

  let dateOneMonthAgo = new Date();
  dateOneMonthAgo.setMonth(dateOneMonthAgo.getMonth() - 1); // 1 month ago
  let dateSixMonthAgo = new Date();
  dateSixMonthAgo.setMonth(dateSixMonthAgo.getMonth() - 6); // 6 month ago
  let totalActiveProfiles = { "1month": 0, "6month": 0 };
  try {
    totalActiveProfiles["1month"] = await Profile.countDocuments({
      updatedAt: { $gt: dateOneMonthAgo },
    });
  } catch (e) {
    logger.error(e, "failed to load totalActiveProfiles profiles");
  }
  try {
    totalActiveProfiles["6month"] = await Profile.countDocuments({
      updatedAt: { $gt: dateSixMonthAgo },
    });
  } catch (e) {
    logger.error(e, "failed to load totalActiveProfiles profiles");
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
      totalCustomDomains: totalCustomDomains || 0,
      totalActiveProfiles: totalActiveProfiles,
    },
  };
}
