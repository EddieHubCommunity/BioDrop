import fs from "fs";
import * as dotenv from "dotenv";

import connectMongo from "@config/mongo";
import { USERS } from "./test-users.js";
import { Profile, Link } from "@models/index";

dotenv.config();

module.exports = async () => {
  // remove test file data
  USERS.forEach((username) => {
    fs.unlinkSync(`./data/${username}.json`);
    if (fs.existsSync(`./data/${username}`)) {
      fs.rmSync(`./data/${username}`, { recursive: true, force: true });
    }
  });
  fs.unlinkSync(`./data/_test-wcag-user.json`);

  // remove test data in database
  await connectMongo();

  // get IDs with `_tests-*`
  const testUsers = await Profile.find({ username: /_test-/ });

  // delete test documents
  await Promise.all(
    testUsers.map(async (user) => {
      await Profile.deleteOne({ username: user.username });
      await Link.deleteMany({ username: user.username });
    }),
  );
};
