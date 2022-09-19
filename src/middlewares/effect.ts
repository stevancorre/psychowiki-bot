import { replyToMessage } from "pwb/helpers/telegraf";
import { Context } from "telegraf";

export default async function effectMiddleware(ctx: Context, next: () => Promise<void>): Promise<void> {
    const message = ctx.message;
    if (message === undefined) return;
    if (!("text" in message)) return;

    const command: string | undefined = message.text.split(" ")[0];
    if(!command) return;
    const source: string = message.text.substring(command.length).trim();

    const match = /^(?<effect>.*\S.*)$/gim.exec(source);
    if (!match?.groups?.["effect"])
        {
            await ctx.replyWithMarkdownV2(
                `Usage: \`${command} <effect>\`\nExample: \`${command} anxiety\``,
                replyToMessage(ctx),
            );
            return;
        }

    const effect: string | undefined = match.groups["effect"]?.replace(/ +/, "-").toLowerCase();
    if(!effect) return;
    ctx.state["effect"] = effect;

    next();
}
