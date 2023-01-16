import * as pino from "pino";

const logger = pino(
  pino.destination({
    // minLength: 4096,
    sync: true,
  })
);

export default logger;
