import logger from "@config/logger";
import { Changelog } from "@models/index";

export default async function logChange({ userId, collection, changesBefore, changesAfter }) {
  let diff;

  const collectionName = collection;
  const docId = changesAfter._id || changesBefore._id;

  if (changesBefore && changesAfter) {
    diff = getChangesDiff(changesBefore, changesAfter);
  } else {
    diff = changesAfter;
  }

  const change = {
    userId,
    docId,
    collectionName,
    changesBefore,
    changesAfter,
    diff,
  };

  if (changesBefore !== changesAfter && JSON.stringify(diff) !== "{}") {
    await Changelog.create({ ...change });
    logger.info(`Changelog added for: "${collection}" for user id ${userId}`);
  } else {
    logger.info(`No changelog for: "${collection}" by user id ${userId}`);
  }
}

function getChangesDiff(chngB, chngA) {
  const diff = {};

  for (const key in chngA) {
    if (JSON.stringify(chngB[key]) !== JSON.stringify(chngA[key])) {
      diff[key] = chngA[key];
    }
  }

  const { updatedAt, ...cleanedDiff } = diff;

  return cleanedDiff;
}
