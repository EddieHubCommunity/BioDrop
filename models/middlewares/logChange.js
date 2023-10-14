import logger from "@config/logger";
import { Changelog } from "@models/index";

export default async function logChange(session, { model, changesBefore, changesAfter }) {
  let userId = session.user.id;
  let operation;
  let diff;

  const docId = changesAfter ? changesAfter._id : changesBefore._id;

  if (changesBefore && changesAfter) {
    operation = "UPDATE";
    diff = getChangesDiff(changesBefore, changesAfter);
  } else {
    operation = changesAfter ? "CREATE" : "DELETE";
    diff = changesAfter;
  }

  const change = {
    userId,
    docId,
    model,
    operation,
    changesBefore,
    changesAfter,
    diff,
  };

  if (changesBefore !== changesAfter && JSON.stringify(diff) !== "{}") {
    await Changelog.create({ ...change });
    logger.info(`Changelog added for: "${model}" for user id ${userId}`);
  } else {
    logger.info(`No changelog for: "${model}" by user id ${userId}`);
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
