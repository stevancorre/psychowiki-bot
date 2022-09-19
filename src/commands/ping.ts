import { Context } from "telegraf";

import { Command } from "../core/command";

const PingCommand: Command = {
    name: "ping",
    description: "Ping the bot",
    handler: async (ctx: Context) => {
        await ctx.replyToMessageWithHTML("🏓 Pong!");
    },
};
export default PingCommand;
