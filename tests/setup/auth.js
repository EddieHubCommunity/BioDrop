import connectMongo from "@config/mongo";
import { serverEnv } from "@config/schemas/serverSchema";
import { encode } from "next-auth/jwt";

import { User, Session, Account } from "@models/index";

const login = async (
  browser,
  user = {
    id: "22222222",
    name: "Automated Test Standard User",
    email: "test-standard-user@test.com",
    username: "_test-profile-user-6",
  }
) => {
  await connectMongo();

  const date = new Date();
  const sessionToken = await encode({
    token: {
      image: "https://github.com/eddiejaoude.png",
      access_token: "ggg_zZl1pWIvKkf3UDynZ09zLvuyZsm1yC0YoRPt",
      ...user,
    },
    secret: serverEnv.NEXTAUTH_SECRET,
  });

  let testUser;

  try {
    testUser = await User.findOneAndUpdate(
      { email: user.email },
      {
        name: user.name,
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
        providerAccountId: user.id,
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
