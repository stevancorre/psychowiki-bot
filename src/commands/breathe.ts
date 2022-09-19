import { Command } from "pwb/core/command";
import { Context } from "telegraf";

const BreatheCommand: Command = {
    name: "breathe",
    description: "Sends a gif to help you focusing on your breathing",
    handler: async (ctx: Context) => {
        await ctx.replyToMessageWithVideo("https://i.imgur.com/xtwSfR0.gif");
    },
};
export default BreatheCommand;
