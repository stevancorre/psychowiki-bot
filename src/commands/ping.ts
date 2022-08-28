import { Context } from "telegraf";

import { Command } from "../core/command";

const PingCommand: Command = {
    name: "ping",
    description: "",
    handler: async (ctx: Context) => {
        await ctx.reply("🏓 Pong!", {
            reply_to_message_id: ctx.message?.message_id,
        });
    },
};
export default PingCommand;
