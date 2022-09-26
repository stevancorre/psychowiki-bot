import { createLogger, format, Logger, transports } from "winston";

import { env } from "./env";

const { colorize, combine, json, prettyPrint, printf, simple, timestamp } = format;
const { File, Console } = transports;

const appLogger: Logger = createLogger({
    transports: [
        new Console({
            format: combine(
                simple(),
                colorize(),
                printf((info) => `[${info["timestamp"]}] ${info.level}: ${info.message}`),
            ),
        }),
        new File({ filename: "logs/error.log", level: "error" }),
        new File({ filename: "logs/warn.log", level: "warn" }),
        new File({ filename: "logs/combined.log" }),
    ],
    format: combine(
        timestamp({
            format: "YYYY-MM-DD HH:mm:ss",
        }),
        json(),
        prettyPrint(),
    ),
    level: env.LOG_LEVEL,
});
export default appLogger;
