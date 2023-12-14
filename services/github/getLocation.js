import logger from "@config/logger";
import getLocationByUsername from "@services/github/getLocationByUsername";
import { Profile } from "@models/index";

async function saveLocation(username) {
  const location = await getLocationByUsername(username);
  try {
    await Profile.updateOne(
      {
        username,
      },
      {
        location: {
          provided: location.provided,
          name: location.name,
          lat: location.lat,
          lon: location.lon,
          updatedAt: new Date(),
        },
      },
      { timestamps: false },
    );
  } catch (e) {
    logger.error(
      e,
      `failed to update profile location for username: ${username}`,
    );
  }
}

export default async function getLocation(username, getProfile) {
  const now = new Date();
  const cacheDays = 30;

  if (!getProfile.location || !getProfile.location.updatedAt) {
    logger.info(`no profile location found for username: ${username}`);
    await saveLocation(username);
    return;
  }

  let updatedAt = now.setDate(now.getDate() - cacheDays);
  updatedAt = new Date(getProfile.location.updatedAt);
  const expireOn = new Date(getProfile.location.updatedAt).setDate(
    updatedAt.getDate() + cacheDays,
  );

  if (expireOn > now.getTime()) {
    logger.info(`profile location not expired for username: ${username}`);
    return;
  }

  if (expireOn < now.getTime()) {
    logger.info(`profile location expired for username: ${username}`);
    await saveLocation(username);
    return;
  }
}
