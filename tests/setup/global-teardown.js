const { chromium } = require("@playwright/test");
const fs = require("fs");

const { USERS } = require("./test-users.js");

module.exports = async (config) => {
  USERS.forEach((username) => fs.unlinkSync(`./data/${username}.json`));
};
