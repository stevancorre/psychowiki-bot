import { Telegraf } from "telegraf";

import appConfig from "./core/configuration";

const bot = new Telegraf(appConfig.token);
bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
