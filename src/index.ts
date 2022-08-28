import { Telegraf } from "telegraf";

import { handleSignals, registerCommands, startClient } from "./core/client";
import appConfig from "./core/configuration";

const bot = new Telegraf(appConfig.token);

registerCommands(bot);
startClient(bot);
handleSignals(bot);
