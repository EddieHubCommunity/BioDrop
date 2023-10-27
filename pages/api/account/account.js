import logger from "@config/logger";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import connectMongo from "@config/mongo";
import { Account } from "@models/index";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method !== "GET") {
    return res
      .status(400)
      .json({ error: "Invalid request: GET request required" });
  }

  try {
    const data = await getAccountByProviderAccountId(session.user.id);
    res.status(200).json(data);
  } catch (e) {
    logger.error(e, "Error in Account handler");
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getAccountByProviderAccountId(
  providerAccountId,
  provider = "github",
) {
  await connectMongo();

  let account = null;
  try {
    account = await Account.findOne({ provider, providerAccountId });
    if (!account) {
      logger.info(
        `Account not found for providerAccountId: ${providerAccountId}`,
      );
    }
  } catch (e) {
    logger.error(e, "Error retrieving account");
    throw e;
  }

  return account;
}

export async function associateProfileWithAccount(account, newProfileId) {
  await connectMongo();

  try {
    const existingProfile = account.profiles.find((profile) =>
      profile.equals(newProfileId),
    );

    if (existingProfile) {
      logger.info(
        `Profile already exists in the account. Skipping addition of profile: ${newProfileId}`,
      );
      return account;
    }

    account.profiles.push(newProfileId);
    await account.save();

    logger.info(`Profile added to account successfully: ${newProfileId}`);

    return account;
  } catch (e) {
    logger.error(e, `Error adding profile to account ${account.userId}`);
    return null;
  }
}
