import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf } = format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}] ${message}`;
});

const logger = createLogger({
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), logFormat),
  transports: [
    new transports.File({ filename: "logs/combined.log" }),
    new transports.Console(),
  ],
});

// middleware som använder loggern

function logRequest(req, res, next) {
  logger.info(`${req.metod}, ${req.url}`);

  next();
}

export { logger, logRequest };
