import mongoose from "mongoose";
import * as fs from "fs";

import logger from "@config/logger";
import env from '@config/env'

let hasConnection;
const connectMongo = async () => {
  if (hasConnection) {
    return hasConnection;
  }
  try {
    // DigitalOcean Apps has cert as environment variable but Mongo needs a file path
    // Write Mongo cert file to disk
    if (env.CA_CERT) {
      fs.writeFileSync("cert.pem", env.CA_CERT);
    }

    hasConnection = await mongoose.connect(
      env.LINKFREE_MONGO_CONNECTION_STRING,
      { autoIndex: true, family: 4 }
    );
    hasConnection = true;
    logger.info("MongoDB connected");
    return hasConnection;
  } catch (e) {
    hasConnection = false;
    logger.error(e, "DB connection failed");
  }
};

export default connectMongo;
