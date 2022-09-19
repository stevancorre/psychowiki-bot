import { commands } from "pwb/commands";
import restrictToMiddleware from "pwb/middlewares/restrictTo";
import { Telegraf } from "telegraf";

import logger from "./logging";

export const registerCatch = (bot: Telegraf): void => {
    bot.catch((error: unknown) => {
        logger.error(error);
    });
};

export const registerMiddelwares = (bot: Telegraf): void => {
    bot.use(restrictToMiddleware);
};

export const registerCommands = async (bot: Telegraf): Promise<void> => {
    for (const command of commands) {
        const [first, ...rest] = [...(command.middlewares ?? []), command.handler];
        bot.command(command.name, first, ...rest);
    }

    logger.info(`Registered ${commands.length} commands`);

    await bot
        .setMyCommands(commands)
        .then(() => logger.info("Bot commands set"))
        .catch((error) => logger.crit(`Error while settings bot commands: ${error}`));
};

export const startClient = async (bot: Telegraf): Promise<void> => {
    await bot
        .launch()
        .then(() => logger.info("Ready"))
        .catch(logger.crit);
};

export const handleSignals = (bot: Telegraf): void => {
    process.once("SIGINT", () => {
        logger.info("Stopped by SIGINT");
        bot.stop("SIGINT");
    });

    process.once("SIGTERM", () => {
        logger.info("Stopped by SIGTERM");
        bot.stop("SIGTERM");
    });
};
