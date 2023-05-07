import mongoose from "mongoose";

import logger from "../config/logger";

let hasConnection;
const connectMongo = async () => {
  if (!process.env.LINKFREE_MONGO_CONNECTION_STRING) {
    throw new Error(
      "Please define the LINKFREE_MONGO_CONNECTION_STRING environment variable (if local add to .env file)"
    );
  }

  if (hasConnection) {
    return hasConnection;
  }

  try {
    hasConnection = await mongoose.connect(
      process.env.LINKFREE_MONGO_CONNECTION_STRING,
      { autoIndex: true, family: 4 }
    );
    logger.info("MongoDB connected");
    return hasConnection;
  } catch (e) {
    hasConnection = undefined;
    logger.error(e, "DB connection failed");
  }
};

export default connectMongo;
