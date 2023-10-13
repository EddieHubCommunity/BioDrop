import connectMongo from "@config/mongo";
import logger from "@config/logger";
import { Profile } from "@models/index";

export default async function handler(req, res) {
  const domain = req.query.domain;
  if (!domain) {
    return res
      .status(400)
      .json({ error: "Invalid request: domain is required" });
  }

  const profile = await getDomainApi(domain);
  return res.status(200).json(profile);
}

export async function getDomainApi(domain) {
  domain = decodeURIComponent(domain).replaceAll(".", "|");
  await connectMongo();

  let profile = {};
  try {
    profile = await Profile.aggregate([
      {
        $match: {
          "settings.domain": domain,
          isEnabled: true,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $project: {
          user: { type: 1 },
          username: 1,
          isEnabled: 1,
          settings: { domain: 1 },
        },
      },
    ]).limit(1);
  } catch (e) {
    logger.error(e, `error finding profile for domain ${domain}`);
    return {};
  }

  if (profile.length > 0) {
    profile = profile[0];
    return {
      username: profile.username,
      settings: { domain: profile.settings?.domain.replaceAll("|", ".") }, // TODO: use getter/setter instead
      user: { type: profile.user[0].type },
    };
  }

  return {};
}
