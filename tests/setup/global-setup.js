import fs from "fs";

const { USERS } = require("./test-users.js");

import icons from "@config/icons.json";
import logger from "@config/logger";

const links = Object.keys(icons).map((icon, index) => {
  return {
    name: `Link ${index} - ${icon} icon`,
    url: "https://github.com/EddieHubCommunity/LinkFree",
    icon: icon,
  };
});

const wcagUser = {
  name: "_TEST-WCAG-USER",
  type: "personal",
  bio: `Bio for _test-wcag-user`,
  links: links,
};

const user = (username) => {
  return {
    name: username.toUpperCase(),
    type: "personal",
    bio: `Bio for ${username}`,
    links: [
      {
        name: "Link 1",
        url: "http://eddiejaoude.io",
        icon: "FaBad-Icon",
      },
      {
        name: "Link 2",
        url: "http://eddiehub.org",
        icon: "link",
      },
    ],
  };
};

module.exports = async () => {
  USERS.forEach((username) => {
    const data = user(username);

    try {
      fs.writeFileSync(`./data/${username}.json`, JSON.stringify(data));
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
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/system/reload?secret=development`
    );
    if (response.status !== 200) {
      throw new Error(`Test data not loaded into database`);
    }
  } catch (e) {
    logger.error(e);
    throw new Error(`Test data not loaded into database`);
  }
};
