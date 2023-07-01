import { serverEnv } from "@config/schemas/serverSchema";
import * as PinoLogger from "pino";

const development = {
  transport: {
    target: "pino-pretty",
    options: {
      level: "debug",
      colorize: true,
      translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
      ignore: "pid,hostname", //Ignores process id and hostname
    },
  },
};
const production = {
  transport: {
    target: "pino-pretty",
    options: {
      level: "info",
      colorize: true,
    },
  },
};

let logger;

logger = PinoLogger.pino(
  serverEnv.NODE_ENV === "development" ? development : production
);

export default logger;
