import * as pino from "pino";

const config = {
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
};

const logger = pino(process.env.NODE_ENV === "development" ? config : {});

export default logger;
