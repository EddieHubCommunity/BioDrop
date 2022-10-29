const { chromium } = require("@playwright/test");
const fs = require("fs");

module.exports = async (config) => {
  const users = [
    "_test-profile-user-1",
    "_test-profile-user-2",
    "_test-profile-user-3",
  ];
  users.forEach((username) => fs.unlinkSync(`./data/${username}.json`));
};
