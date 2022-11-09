import { chromium } from "@playwright/test";
import fs from "fs";

const { USERS } = require("./test-users.js");

const user = (username) => {
  return {
    name: username.toUpperCase(),
    displayStatsPublic: true,
    type: "personal",
    bio: `Bio for ${username}`,
    avatar: "https://github.com/eddiejaoude.png",
    links: [
      {
        name: "Link 1",
        url: "http://eddiejaoude.io",
        icon: "link",
      },
      {
        name: "Link 2",
        url: "http://eddiehub.org",
        icon: "link",
      },
    ],
  };
};

module.exports = async (config) => {
  USERS.forEach((username) => {
    const data = user(username);

    try {
      fs.writeFileSync(`./data/${username}.json`, JSON.stringify(data));
    } catch (e) {
      console.log(e);
      throw new Error(`Test data "${username}" not created`);
    }
  });
};
