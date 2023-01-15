import { chromium } from "@playwright/test";
import fs from "fs";
import * as dotenv from "dotenv";

import connectMongo from "../../config/mongo";
import { USERS } from "./test-users.js";
import Profile from "../../models/Profile";
import Link from "../../models/Link";

dotenv.config();

module.exports = async (config) => {
  // remove test file data
  USERS.forEach((username) => fs.unlinkSync(`./data/${username}.json`));
  fs.unlinkSync(`./data/_test-wcag-user.json`)

  // remove test data in database
  await connectMongo();

  // get IDs with `_tests-*`
  const testUsers = await Profile.find({ username: /_test-/ });
  const testLinks = await Link.find({ username: /_test-/ });

  // delete test documents
  testUsers.map(
    async (user) => await Profile.deleteOne({ username: user.username })
  );
  testLinks.map(
    async (user) => await Link.deleteOne({ username: user.username })
  );
};
