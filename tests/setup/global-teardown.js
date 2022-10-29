import { chromium } from "@playwright/test";
import fs from "fs";

const { USERS } = require("./test-users.js");

module.exports = async (config) => {
  USERS.forEach((username) => fs.unlinkSync(`./data/${username}.json`));
};
