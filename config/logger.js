import * as PinoLogger from "pino";
import * as Pretty from "pino-pretty";
import { serverEnv } from "@config/schemas/serverSchema";

const config = serverEnv.NODE_ENV === "development" ? Pretty({ colorize: true }) : {};

const logger = PinoLogger.pino(config);

export default logger;
