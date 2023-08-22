import logger from "@config/logger";
import { Changelog } from "@models/index";

export default function dbChangesLoggerMiddleware(schema) {
  let isUpdateOperation;

  let username;
  let collection;
  let changesBefore;
  let changesAfter;
  let diff;

  async function beforeUpdate(next) {
    isUpdateOperation = this.op && this.op === "findOneAndUpdate";

    username = isUpdateOperation 
      ? this._conditions.username 
      : this.username;
    collection = isUpdateOperation 
      ? this._collection.collectionName 
      : this.constructor.collection.collectionName;
    changesBefore = isUpdateOperation 
      ? await this.model.findOne(this.getFilter()) 
      : null;
  
    next();
  }

  async function afterUpdate(doc, next) {
    changesAfter = await doc.constructor.findById(doc._id);

    if (isUpdateOperation && changesBefore && changesAfter) {
      diff = getChangesDiff(changesBefore._doc, changesAfter._doc);
    } else {
      diff = doc;
    }

    const change = {
      username,
      docId: doc._id,
      collectionName: collection,
      changesBefore,
      changesAfter,
      diff,
    };

    if (changesBefore !== changesAfter) {
      await Changelog.create({ ...change });
      logger.info(change);
    } else {
      logger.info(`No changes occured in: ${collection}`)
    }

    return next();
  }
  
  schema.pre("save", beforeUpdate);
  schema.pre("findOneAndUpdate", beforeUpdate);

  schema.post("save", afterUpdate);
  schema.post("findOneAndUpdate", afterUpdate);
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