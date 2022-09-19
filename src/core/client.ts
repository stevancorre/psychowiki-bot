import { Telegraf } from "telegraf";

import { commands } from "../commands";
import restrictToMiddleware from "../middlewares/restrictTo";
import logger from "./logging";

export const registerCatch = (bot: Telegraf) => {
    bot.catch((error: unknown) => {
        logger.error(error);
    });
};

export const registerMiddelwares = (bot: Telegraf) => {
    bot.use(restrictToMiddleware);
};

export const registerCommands = (bot: Telegraf) => {
    for (const command of commands) {
        const [first, ...rest] = [...(command.middlewares ?? []), command.handler];
        bot.command(command.name, first, ...rest);
    }

    logger.info(`Registered ${commands.length} commands`);

    // todo: set bot commands
};

export const startClient = (bot: Telegraf) => {
    bot.launch()
        .then(() => logger.info("Ready"))
        .catch(logger.crit);
};

export const handleSignals = (bot: Telegraf) => {
    process.once("SIGINT", () => {
        logger.info("Stopped by SIGINT");
        bot.stop("SIGINT");
    });

    process.once("SIGTERM", () => {
        logger.info("Stopped by SIGTERM");
        bot.stop("SIGTERM");
    });
};
