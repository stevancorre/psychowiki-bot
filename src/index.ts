import { Telegraf } from "telegraf";

import {
    handleSignals,
    registerCatch,
    registerCommands,
    registerMiddelwares,
    startClient,
} from "./core/client";
import appConfig from "./core/configuration";

const bot = new Telegraf(appConfig.token);

registerCatch(bot);
registerMiddelwares(bot);
registerCommands(bot);

startClient(bot);

handleSignals(bot);

export default bot;
