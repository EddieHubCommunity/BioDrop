import logger from "@config/logger";
import { Changelog } from "@models/index";

export default async function logChange({ username, collection, changesBefore, changesAfter }) {
  let diff;

  const collectionName = collection;
  const docId = changesAfter._id || changesBefore._id;

  if (changesBefore && changesAfter) {
    diff = getChangesDiff(changesBefore, changesAfter);
  } else {
    diff = changesAfter;
  }

  const change = {
    username,
    docId,
    collectionName,
    changesBefore,
    changesAfter,
    diff,
  };

  if (changesBefore !== changesAfter) {
    await Changelog.create({ ...change });
    logger.info(change);
  } else {
    logger.info(`No changes occured in: ${collection}`);
  }
}

function getChangesDiff(chngB, chngA) {
  const diff = {};

  for (const key in chngA) {
    if (JSON.stringify(chngB[key]) !== JSON.stringify(chngA[key])) {
      diff[key] = chngA[key];
    }
  }

  return diff;
}