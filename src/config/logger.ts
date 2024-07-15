import winston from "winston";

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.colorize()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: "build/log/error.log",
            level: "error",
        }),
        new winston.transports.File({ filename: "build/log/combined.log" }),
    ],
});

export default logger;
