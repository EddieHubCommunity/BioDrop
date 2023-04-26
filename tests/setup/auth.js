import path from "node:path";
import connectMongo from "@config/mongo";
import jsonwebtoken from "jsonwebtoken";
import { encode } from 'next-auth/jwt';

import User from "@models/User";
import Session from "@models/Session";
import Account from "@models/Account";

const login = async (browser) => {
  await connectMongo();

  const date = new Date();
  const sessionToken = await encode(
    {
      token: {
        name: "Automate Test",
        email: "testemail@test.com",
        image: "https://github.com/eddiejaoude.png",
        access_token: "ggg_zZl1pWIvKkf3UDynZ09zLvuyZsm1yC0YoRPt",
        username: "eddiejaoude",
        id: "22222222"
      },
      secret: process.env.NEXTAUTH_SECRET,
    }
  );

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
    console.error("Test user creation failed", e);
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
    console.error(e, `Test Account creation failed`);
  }

  const context = await browser.newContext();
  await context.addCookies([
    {
      name: "next-auth.session-token",
      value: sessionToken,
      domain: "localhost",
      path: "/",
      httpOnly: true,
      sameSite: "Lax",
      secure: true,
      expires: -1,
    },
  ]);

  return context;
};
const logout = async (browser) => {
  const context = await browser.newContext();
  await context.clearCookies();
  return context;
};

export { login, logout };
