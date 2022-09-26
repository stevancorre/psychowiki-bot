import {
    handleSignals,
    registerCatch,
    registerCommands,
    registerMiddelwares,
    startClient,
} from "pwb/core/client";
import { env } from "pwb/core/env";
import { Telegraf } from "telegraf";

const bot = new Telegraf(env.TOKEN);

registerCatch(bot);
registerMiddelwares(bot);
await registerCommands(bot);

await startClient(bot);

handleSignals(bot);

export default bot;
