import { Context } from "telegraf";

import { Command } from "../core/command";
import { replyToMessage } from "../helpers/telegraf";

const BreatheCommand: Command = {
    name: "breathe",
    description: "",
    handler: async (ctx: Context) => {
        await ctx.replyWithVideo("https://i.imgur.com/xtwSfR0.gif", replyToMessage(ctx));
    },
};
export default BreatheCommand;
