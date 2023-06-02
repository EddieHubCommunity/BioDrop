import * as PinoLogger from "pino";
import * as Pretty from "pino-pretty";
import { serverEnv } from "@config/schemas/serverSchema";
import { clientEnv } from "./schemas/clientSchema";

const config = clientEnv.NODE_ENV === "development" ? Pretty({ colorize: true }) : {};

const logger = PinoLogger.pino(config);

export default logger;
