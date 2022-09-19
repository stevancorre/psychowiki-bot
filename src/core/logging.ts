import { createLogger, format, Logger, transports } from "winston";

import appConfig from "./configuration";

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
    level: appConfig.logLevel,
});
export default appLogger;
