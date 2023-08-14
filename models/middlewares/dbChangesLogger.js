import logger from "@config/logger";
import { DBChange } from "@models/index";

const dbChangesLoggerMiddleware = (schema) => {
  let username;
  let collection;
  let changesBefore;
  let changesAfter;

  async function beforeUpdate(next) {
    const isUpdateOperation = this.op && this.op === "findOneAndUpdate";

    username = isUpdateOperation ? this._conditions.username : this.username;
    collection = isUpdateOperation ? this._collection.collectionName : this.constructor.collection.collectionName;
    changesBefore = isUpdateOperation ? await this.model.findOne(this.getFilter()) : null;
  
    next();
  }

  async function afterUpdate(doc, next) {
    changesAfter = await doc.constructor.findById(doc._id);

    const date = new Date();
    
    const change = {
      username,
      collection,
      doc: doc._id,
      changesBefore,
      changesAfter,
      date
    };
    
    if (changesBefore !== changesAfter) {
      await DBChange.create({ ...change });
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
};

module.exports = dbChangesLoggerMiddleware;
