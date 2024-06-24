
import path from "path";
import { createLogger, format, transports  } from 'winston';
const { combine, timestamp, label, printf,prettyPrint } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    const date = new Date(timestamp);
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const second = date.getSeconds();
  return `${date.toDateString()}:${hour}-${minutes}-${second} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  level: "info",
  format: combine(
    label({ label: 'LR' }),
    timestamp(),
    myFormat,prettyPrint()
  ),
  transports: [
    new transports.File({
      filename: path.join(process.cwd(), "logs", "winston", "success.log"),
      level: "info",
    }),
    new transports.Console(),
  ],
});

// create new folder and file for logging
// logs/winstone
// success.log
// error.log

const errorLogger = createLogger({
  level: "error",
  format: combine(
    label({ label: 'LR' }),
    timestamp(),
    myFormat
  ),
  transports: [
    new transports.File({ filename: path.join(process.cwd(), "logs", "winston", "error.log"), level: "error" }),
    new transports.Console(),
  ],
});

export { logger, errorLogger };
