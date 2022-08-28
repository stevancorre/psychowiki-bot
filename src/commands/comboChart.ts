import { Context } from "telegraf";

import { Command } from "../core/command";
import { replyToMessage } from "../helpers/telegraf";

const ComboChartCommand: Command = {
    name: "combochart",
    description: "",
    handler: async (ctx: Context) => {
        await ctx.replyWithPhoto("https://wiki.tripsit.me/images/3/3a/Combo_2.png", replyToMessage(ctx));
    },
};
export default ComboChartCommand;
