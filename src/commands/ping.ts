import { Context } from "telegraf";

import { Command } from "../core/command";
import { replyToMessage } from "../helpers/telegraf";

const PingCommand: Command = {
    name: "ping",
    description: "",
    handler: async (ctx: Context) => {
        await ctx.reply("🏓 Pong!", replyToMessage(ctx));
    },
};
export default PingCommand;
