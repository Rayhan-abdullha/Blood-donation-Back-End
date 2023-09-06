const path = require("path");
const { format, transports } = require("winston");
const winston = require("winston");
const { combine, timestamp, label, printf, prettyPrint } = format;

const DailyRotateFile = require("winston-daily-rotate-file");

const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${date.toDateString()} ${hours.toString()}:${minutes.toString()}:${seconds.toString()} [${label}] ${level}: ${message}`;
});

const infoLogger = winston.createLogger({
  level: "info",
  format: combine(label({ label: "PH" }), timestamp(), prettyPrint(), myFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        "logs",
        "winswton",
        "success",
        "phu-%DATE%-info.log"
      ),
      datePattern: "YYYY-MM-DD-HH",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "7d",
    }),
  ],
});

const errorLogger = winston.createLogger({
  level: "error",
  format: combine(label({ label: "PH" }), timestamp(), prettyPrint()),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        "logs",
        "winswton",
        "errors",
        "phu-%DATE%-error.log"
      ),
      datePattern: "YYYY-MM-DD-HH",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});

module.exports = {
  infoLogger,
  errorLogger,
};
