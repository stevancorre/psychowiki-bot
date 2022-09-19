import { Command } from "pwb/core/command";
import { Context } from "telegraf";

const PingCommand: Command = {
    name: "ping",
    description: "Ping the bot",
    handler: async (ctx: Context): Promise<void> => {
        await ctx.replyToMessageWithHTML("🏓 Pong!");
    },
};
export default PingCommand;
