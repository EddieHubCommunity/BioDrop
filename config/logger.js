import * as PinoLogger from "pino";
import * as Pretty from "pino-pretty";
import { env } from "@config/envConfig";

const config = env.NODE_ENV === "development" ? Pretty({ colorize: true }) : {};

const logger = PinoLogger.pino(config);

export default logger;
