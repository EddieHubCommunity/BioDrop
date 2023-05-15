import mongoose from "mongoose";
import { env } from "process";
import logger from "./logger";

let connection;

const connectMongo = async () => {
  const { LINKFREE_MONGO_CONNECTION_STRING } = process.env;

  if (!LINKFREE_MONGO_CONNECTION_STRING) {
    throw new Error(
      "Please define the LINKFREE_MONGO_CONNECTION_STRING environment variable (if local add to .env file)"
    );
  }

  if (connection) {
    return connection;
  }

  try {
    const options = { autoIndex: true, family: 4 };
    connection = await mongoose.connect(LINKFREE_MONGO_CONNECTION_STRING,options);
    logger.info("MongoDB connected:", connection.name);
  } catch (error) {
    logger.error("DB connection failed:", error.message);
    throw error;
  }
};

export default connectMongo;
