import { Command } from "pwb/core/command";
import { Context } from "telegraf";

const ComboChartCommand: Command = {
    name: "combochart",
    description: "Sends the tripsit's combo chaart",
    handler: async (ctx: Context): Promise<void> => {
        await ctx.replyToMessageWithPhoto("https://wiki.tripsit.me/images/3/3a/Combo_2.png");
    },
};
export default ComboChartCommand;
