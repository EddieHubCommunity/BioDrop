import * as PinoLogger from "pino";

const config = {
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
};

let logger

if (process.env.STORYBOOK_RUN) {
  logger = {
    child: console.log,
    info: console.log,
    error: console.log,
  }
} else {
  logger = PinoLogger.pino(
    process.env.NODE_ENV === "development" ? config : {}
  );
}

export default logger;
