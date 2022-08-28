import { Telegraf } from "telegraf";

import { commands } from "../commands";

import logger from "./logging";

export const registerCommands = (bot: Telegraf) => {
    for (const command of commands) {
        bot.command(command.name, command.handler);
    }

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
