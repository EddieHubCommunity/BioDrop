import logger from "@config/logger";
import loadProfiles from "../../../util/loadProfiles.mjs";

export default async function handler(req, res) {
  if (
    req.method !== "GET" ||
    req.query.secret !== process.env.LINKFREE_API_SECRET
  ) {
    logger.error(
      `attempt to load profile json but security check failed: "${req.query.secret}"`
    );
    return res.status(401).json({ error: "ONLY system calls allowed" });
  }

  const stats = await loadProfiles();


  return res.status(200).json({
    message: "success",
    statistics: stats,
  });

}
