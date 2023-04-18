import { chromium } from "@playwright/test";
import fs from "fs";
import UserSchema from "@models/User";
import SessionSchema from "@models/Session";
import AccountSchema from "@models/Account";
import path from 'node:path'

const { USERS } = require("./test-users.js");
import icons from "../../config/icons.json";
import logger from "../../config/logger";
import { profile } from "console";
const links = Object.keys(icons).map((icon, index) => {
  return {
    name: `Link ${index} - ${icon} icon`,
    url: "https://github.com/EddieHubCommunity/LinkFree",
    icon: icon,
  };
});

const wcagUser = {
  name: "_TEST-WCAG-USER",
  type: "personal",
  bio: `Bio for _test-wcag-user`,
  links: links,
};

const user = (username) => {
  return {
    name: username.toUpperCase(),
    type: "personal",
    bio: `Bio for ${username}`,
    links: [
      {
        name: "Link 1",
        url: "http://eddiejaoude.io",
        icon: "FaBad-Icon",
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
      logger.error(e);
      throw new Error(`Test data "${username}" not created`);
    }
  });

  try {
    fs.writeFileSync(`./data/_test-wcag-user.json`, JSON.stringify(wcagUser));
  } catch (e) {
    logger.error(e);
    throw new Error(`Test data "_test-wcag-user" not created`);
  }


  const storagePath = path.resolve(__dirname, 'storageState.json');

  const date = new Date()

  // This is a dummy random session token
  const sessionToken = '04456e41-ec3b-4edf-92c1-48c14e57cacd2';
  let testUser;
  try {
  testUser = await UserSchema.updateOne(
    { name: 'test', 
    email: 'testemail@test.com'
   },
    { upsert: true });

    logger.info(`completed`);
  } catch (e) {
    logger.error(e, `failed for`);
  }
if(testUser){

  try {
  await SessionSchema.updateOne(
    { userId: "test",
    expires: new Date(date.getFullYear(), date.getMonth() + 1, 0),
        sessionToken : sessionToken
      },
      { upsert: true });
  logger.info(`completed step 2`);
} catch (e) {
  logger.error(e, `failed for step 2`);
}

try {
  await AccountSchema.updateOne(
    {
      userId: 'test',
      type: 'oauth',
      provider: 'github',
      providerAccountId: '2222222',
      access_token: 'ggg_zZl1pWIvKkf3UDynZ09zLvuyZsm1yC0YoRPt',
      token_type: 'bearer',
      scope: 'read:org,read:user,repo,user:email'
    },
    { upsert: true });
  logger.info(`completed step 3`);
} catch(e){
  logger.error(e, `failed for step 3`);
}


}

const browser = await chromium.launch();
const context = await browser.newContext();
  // 4.1. This cookie is what `NextAuth` will look after to validate if our user is authenticated
  // Please note that the `value` of the cookie **must be the same** as the `sessionToken` we added in `step 2.` 
  await context.addCookies([
    {
      name: 'next-auth.session-token',
      value: sessionToken,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      sameSite: 'Lax',
      expires: 1661406204
    }
  ])
  await context.storageState();
  await browser.close();
};

