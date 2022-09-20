import { Command } from "pwb/core/command";
import { StringBuilder } from "pwb/helpers/stringBuilder";
import { Context } from "telegraf";

const BugCommand: Command = {
    name: "bug",
    description: "Display a message telling you want to do if you found a bug",
    handler: async (ctx: Context): Promise<void> => {
        await ctx.replyToMessageWithHTML(buildBugMessage());
    },
};
export default BugCommand;

const buildBugMessage = (): string =>
    new StringBuilder()
        .appendTitle("If you found a bug")
        .appendLine(
            "Report to <u>rrc_contact@proton.me</u> or to @RRC_Contact with a screenshot if possible and a short description",
        )
        .getContent();
