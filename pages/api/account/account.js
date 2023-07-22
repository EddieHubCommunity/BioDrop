import logger from "@config/logger";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import connectMongo from "@config/mongo";
import { Account } from "@models/index";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  if (req.method !== "GET") {
    return res.status(400).json({ error: "Invalid request: GET request required" });
  }

  try {
    const data = await getAccountByProviderAccountId(session.user.id);
    res.status(200).json(data);
  } catch (error) {
    logger.error('Error in handler:', error);
    res.status(500).json({ error: "Internal server error" });
  }

}

export async function getAccountByProviderAccountId(providerAccountId) {

  logger.info("FUNCTION STARTED: getAccountByProviderAccountId");
  await connectMongo();

  let account = null;
  try {
    account = await Account.findOne({ providerAccountId });
    if (!account) {
      // Account not found
      logger.info("Account not found for providerAccountId: ", providerAccountId);
    }
  } catch (error) {
    logger.error("Error retrieving account:", error);
    throw error;
  }

  logger.info("FUNCTION ENDED: getAccountByProviderAccountId");
  return account;
}

export async function associateProfileWithAccountIfAbsentAndReturnAccount(account, newProfileId) {

  logger.info("FUNCTION STARTED: associateProfileWithAccountIfAbsentAndReturnAccount");

  await connectMongo();

  try {

    // Check if the newProfile already exists in the profiles array
    const existingProfile = account.profiles.find((profile) => profile.equals(newProfileId));

    if (existingProfile) {
      logger.info('Profile already exists in the account. Skipping addition.' + JSON.stringify(account));
      return account;
    }

    // Add the newProfile to the profiles array
    account.profiles.push(newProfileId);

    // Save the updated account
    await account.save();

    logger.info('Profile added to account successfully.Updated Account with profile : ' + JSON.stringify(account));

    logger.info("FUNCTION ENDED: associateProfileWithAccountIfAbsentAndReturnAccount");
    return account;

  } catch (error) {
    logger.error('Error adding profile to account:', error);
    return null;
  }
}