import { Context } from "telegraf";

import { Command } from "../core/command";

const BreatheCommand: Command = {
    name: "breathe",
    description: "Sends a gif to help you focusing on your breathing",
    handler: async (ctx: Context) => {
        await ctx.replyToMessageWithVideo("https://i.imgur.com/xtwSfR0.gif");
    },
};
export default BreatheCommand;
