import * as PinoLogger from "pino";
import * as Pretty from "pino-pretty";
import { clientEnv } from "@config/schemas/clientSchema";

const config = clientEnv.NODE_ENV === "development" ? Pretty({ colorize: true }) : {};

const logger = PinoLogger.pino(config);

export default logger;
