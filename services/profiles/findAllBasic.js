import fs from "fs";
import path from "path";

import logger from "../../config/logger";

export default function findAllBasic() {
  const directoryPath = path.join(process.cwd(), "data");

  let files = [];
  try {
    files = fs
      .readdirSync(directoryPath)
      .filter((item) => item.includes("json"));
  } catch (e) {
    logger.error(e, "failed to list profiles");
  }

  const users = files.flatMap((file) => {
    const filePath = path.join(directoryPath, file);
    try {
      const json = JSON.parse(fs.readFileSync(filePath, "utf8"));
      return {
        name: json.name,
        bio: json.bio,
        displayStatsPublic: json.displayStatsPublic,
        avatar: json.avatar,
        tags: json.tags,
        username: file.split(".")[0],
      };
    } catch (e) {
      logger.error(e, `failed loading profile in: ${filePath}`);
      return [];
    }
  });

  return users;
}
