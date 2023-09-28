import mongoose from "mongoose";
import logger from "./logger";
import { serverEnv } from "@config/schemas/serverSchema";

let connection;

const connectMongo = async () => {
  const { BIODROP_MONGO_CONNECTION_STRING } = serverEnv;

  if (!BIODROP_MONGO_CONNECTION_STRING) {
    throw new Error(
      "Please define the BIODROP_MONGO_CONNECTION_STRING environment variable (if local add to .env file)",
    );
  }

  if (connection) {
    return connection;
  }

  try {
    const options = { autoIndex: true, family: 4, maxPoolSize: 10 };
    connection = await mongoose.connect(
      BIODROP_MONGO_CONNECTION_STRING,
      options,
    );
    logger.info("DB connection successful:", connection.name);

    return connection;
  } catch (error) {
    logger.error("DB connection failed:", error.message);
    throw error;
  }
};

export default connectMongo;
