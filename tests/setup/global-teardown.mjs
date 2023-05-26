import fs from "fs";
import * as dotenv from "dotenv";

import connectMongo from "../../config/mongo.js";
import { USERS } from "./test-users.mjs";
import Profile from "../../models/Profile.js";
import Link from "../../models/Link.js";

dotenv.config();

export default async function teardown() {
  // remove test file data
  USERS.forEach((username) => fs.unlinkSync(`./data/${username}.json`));
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
    })
  );
};
