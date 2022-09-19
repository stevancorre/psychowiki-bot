import { Context } from "telegraf";

import { Command } from "../core/command";

const ComboChartCommand: Command = {
    name: "combochart",
    description: "Sends the tripsit's combo chaart",
    handler: async (ctx: Context) => {
        await ctx.replyToMessageWithPhoto("https://wiki.tripsit.me/images/3/3a/Combo_2.png");
    },
};
export default ComboChartCommand;
