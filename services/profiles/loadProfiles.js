import fs from "fs";
import path from "path";

import logger from "../../config/logger";

export default function loadProfiles(profiles) {
  const directoryPath = path.join(process.cwd(), "data");

  const users = profiles.flatMap((profile) => {
    const filePath = path.join(directoryPath, `${profile.username}.json`);
    try {
      const json = JSON.parse(fs.readFileSync(filePath, "utf8"));
      return {
        ...profile,
        name: json.name,
        bio: json.bio,
        displayStatsPublic: json.displayStatsPublic,
        avatar: json.avatar,
        tags: json.tags,
      };
    } catch (e) {
      logger.error(e, `failed loading profile in: ${filePath}`);
      return [];
    }
  });

  return users;
}
