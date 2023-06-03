import { serverEnv } from "@config/schemas/serverSchema";
import * as PinoLogger from "pino";

const config = {
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
};

let logger;

logger = PinoLogger.pino(serverEnv.NODE_ENV === "development" ? config : {});

export default logger;
