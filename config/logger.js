import * as PinoLogger from "pino";
import env from '@config/env';

const config = {
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
};

let logger;

logger = PinoLogger.pino(
  env.NODE_ENV === "development" ? config : {}
);


export default logger;
