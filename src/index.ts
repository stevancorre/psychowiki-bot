import { Telegraf } from "telegraf";

import { registerCommands } from "./core/command";
import appConfig from "./core/configuration";
import logger from "./core/logging";

const bot = new Telegraf(appConfig.token);

registerCommands(bot);

bot.launch()
    .then(() => logger.info("Ready"))
    .catch(logger.crit);

// handle signals
process.once("SIGINT", () => {
    logger.info("Stopped by SIGINT");
    bot.stop("SIGINT");
});

process.once("SIGTERM", () => {
    logger.info("Stopped by SIGTERM");
    bot.stop("SIGTERM");
});
