import { chromium } from "@playwright/test";
import path from "node:path";
import connectMongo from "@config/mongo";

import User from "@models/User";
import Session from "@models/Session";
import Account from "@models/Account";

const login = async () => {
  await connectMongo();

  const storagePath = path.resolve(__dirname, "storage-state.json");
  const date = new Date();
  const sessionToken = "04456e41-ec3b-4edf-92c1-48c14e57cacd2";
  let testUser;

  try {
    testUser = await User.findOneAndUpdate(
      { email: "testemail@test.com" },
      {
        name: "Automate Test",
        image: "https://github.com/eddiejaoude.png",
        emailVerified: null,
      },
      { new: true, upsert: true }
    );
  } catch (e) {
    console.log("Test user creation failed", e);
  }

  try {
    await Session.findOneAndUpdate(
      {
        userId: testUser._id,
      },
      {
        expires: new Date(date.getFullYear(), date.getMonth() + 1, 0),
        sessionToken: sessionToken,
      },
      { new: true, upsert: true }
    );
  } catch (e) {
    console.log("Test session creation failed", e);
  }

  try {
    await Account.findOneAndUpdate(
      {
        userId: testUser._id,
      },
      {
        type: "oauth",
        provider: "github",
        providerAccountId: "2222222",
        access_token: "ggg_zZl1pWIvKkf3UDynZ09zLvuyZsm1yC0YoRPt",
        token_type: "bearer",
        scope: "read:org,read:user,repo,user:email,test:all",
      },
      { new: true, upsert: true }
    );
  } catch (e) {
    console.log(e, `failed for step 3`);
  }

  const browser = await chromium.launch();
  const context = await browser.newContext({ storageState: storagePath });
  // 4.1. This cookie is what `NextAuth` will look after to validate if our user is authenticated
  // Please note that the `value` of the cookie **must be the same** as the `sessionToken` we added in `step 2.`
  await context.addCookies([
    {
      name: "next-auth.session-token",
      value: sessionToken,
      domain: "localhost",
      path: "/",
      httpOnly: true,
      sameSite: "Lax",
      expires: -1,
    },
  ]);
  await context.storageState({ path: storagePath });
  await browser.close();
};
const logout = async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  await context.clearCookies();
};

export { login, logout };
