import fs from "fs";
import { clientEnv } from "@config/schemas/clientSchema";

const { USERS } = require("./test-users.js");

import icons from "@config/icons.json";
import logger from "@config/logger";

const links = Object.keys(icons).map((icon, index) => {
  return {
    name: `Link ${index} - ${icon} icon`,
    url: "https://github.com/EddieHubCommunity/BioDrop",
    icon: icon,
  };
});

const wcagUser = {
  name: "_TEST-WCAG-USER",
  type: "personal",
  bio: `Bio for _test-wcag-user`,
  links: links,
};

module.exports = async () => {
  USERS.forEach((username) => {
    try {
      const inPath = `./tests/data/${username}`;
      const outPath = `./data/${username}`;
      fs.copyFileSync(`${inPath}.json`, `${outPath}.json`);
      if (fs.existsSync(`${inPath}`)) {
        if (fs.existsSync(`${inPath}/testimonials`)) {
          fs.mkdirSync(`${outPath}/testimonials`, { recursive: true });
          const t_files = fs.readdirSync(`${inPath}/testimonials`);
          t_files.map((file) => {
            fs.copyFileSync(
              `${inPath}/testimonials/${file}`,
              `${outPath}/testimonials/${file}`
            );
          });
        }
        if (fs.existsSync(`${inPath}/events`)) {
          fs.mkdirSync(`${outPath}/events`, { recursive: true });
          const e_files = fs.readdirSync(`${inPath}/events`);
          e_files.map((file) => {
            fs.copyFileSync(
              `${inPath}/events/${file}`,
              `${outPath}/events/${file}`
            );
          });
        }
      }
    } catch (e) {
      logger.error(e);
      throw new Error(`Test data "${username}" not created`);
    }
  });

  try {
    fs.writeFileSync(`./data/_test-wcag-user.json`, JSON.stringify(wcagUser));
  } catch (e) {
    logger.error(e);
    throw new Error(`Test data "_test-wcag-user" not created`);
  }

  try {
    const response = await fetch(
      `${clientEnv.NEXT_PUBLIC_BASE_URL}/api/system/reload?secret=development`
    );
    if (response.status !== 200) {
      throw new Error(`Test data not loaded into database`);
    }
  } catch (e) {
    logger.error(e);
    throw new Error(`Test data not loaded into database`);
  }
};
