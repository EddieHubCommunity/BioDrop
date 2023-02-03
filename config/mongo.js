import mongoose from "mongoose";
import * as fs from "fs";

import logger from "../config/logger";

let hasConnection = false;
const connectMongo = async () => {
  if (!process.env.LINKFREE_MONGO_CONNECTION_STRING) {
    throw new Error(
      "Please define the LINKFREE_MONGO_CONNECTION_STRING environment variable (if local add to .env file)"
    );
  }

  if (hasConnection) {
    return;
  }
  try {
    // DigitalOcean Apps has cert as environment variable but Mongo needs a file path
    // Write Mongo cert file to disk
    if (process.env.CA_CERT) {
      fs.writeFileSync("cert.pem", process.env.CA_CERT);
    }

    await mongoose.connect(process.env.LINKFREE_MONGO_CONNECTION_STRING);
    hasConnection = true;
    logger.info("MongoDB connected");
  } catch (e) {
    hasConnection = false;
    logger.error(e, "DB connection failed");
  }
};

export default connectMongo;
