import { serverEnv } from "@config/schemas/serverSchema";
import * as PinoLogger from "pino";
import { join } from "path";

const logsPath = join(__dirname, "..", "logs", "app.log");

const config = {
  transport: {
    targets: [
    {
      target:"pino-pretty",
      options: {
        colorize: true,
        translateTime: "SYS:dd-mm-yyyy HH:MM:ss",   //System time
        ignore: "pid,hostname"            // Ignores process id and hostname in console that displays after log level message
      }
    },
    {
    target: "pino/file",
    options: {                     
      destination: logsPath,
      mkdir:true,               //creates log file if not present in specified directory
      append: true,
    },
  }
  ]
  },
  level: serverEnv.NODE_ENV === "production" ? "info" : "debug",
  streams: [
    { stream: process.stdout }, // Output logs to console 
    { stream: PinoLogger.destination(logsPath), level: "debug", enabled: true,formatter: "log", }, // Output logs to (app.log) file
  ],
};

const logger = PinoLogger(config);

export default logger;
