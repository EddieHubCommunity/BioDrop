import fs from "fs";
import path from "path";

import logger from "../../config/logger";

export default function findOneByUsername(username) {
  const filePath = path.join(process.cwd(), "data", `${username}.json`);
  let data = {};
  try {
    data = {
      ...JSON.parse(fs.readFileSync(filePath, "utf8")),
      username,
    };
  } catch (e) {
    logger.error(e, `failed loading profile username: ${username}`);
  }

  return data;
}
