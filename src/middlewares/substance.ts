import { replyToMessage } from "pwb/helpers/telegraf";
import { findSubstance } from "pwb/tables/substances";
import { Context } from "telegraf";

export default async function substanceMiddleware(ctx: Context, next: () => Promise<void>): Promise<void> {
    const message = ctx.message;
    if (message === undefined) return;
    if (!("text" in message)) return;

    const command: string | undefined = message.text.split(" ")[0];
    if(!command) return;
    const source: string = message.text.substring(command.length).trim();

    const match = /^(?<substance>.*\S.*)$/gim.exec(source);
    if (!match?.groups?.["substance"])
        {
            await ctx.replyWithMarkdownV2(
                `Usage: \`${command} <substance>\`\nExample: \`${command} ketamine\``,
                replyToMessage(ctx),
            );
            return;
        }

    ctx.state["substance"] = findSubstance(match.groups["substance"]);

    next();
}
