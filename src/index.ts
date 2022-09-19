import {
    handleSignals,
    registerCatch,
    registerCommands,
    registerMiddelwares,
    startClient,
} from "pwb/core/client";
import appConfig from "pwb/core/configuration";
import { Telegraf } from "telegraf";

const bot = new Telegraf(appConfig.token);

registerCatch(bot);
registerMiddelwares(bot);
await registerCommands(bot);

await startClient(bot);

handleSignals(bot);

export default bot;
