import { Telegraf } from "telegraf";

import { handleSignals, registerCatch, registerCommands, startClient } from "./core/client";
import appConfig from "./core/configuration";

const bot = new Telegraf(appConfig.token);

registerCatch(bot);
registerCommands(bot);

startClient(bot);

handleSignals(bot);
