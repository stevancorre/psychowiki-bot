import { Context } from "telegraf";

import { replyToMessage } from "../helpers/telegraf";

export default async function effectMiddleware(ctx: Context, next: () => Promise<void>) {
    const message = ctx.message;
    if (message === undefined) return;
    if (!("text" in message)) return;

    const command: string = message.text.split(" ")[0];
    const source: string = message.text.substring(command.length).trim();

    const match = /^(?<effect>.*\S.*)$/gim.exec(source);
    if (match === null || match.groups === undefined)
        return await ctx.replyWithMarkdownV2(
            `Usage: \`${command} <effect>\`\nExample: \`${command} anxiety\``,
            replyToMessage(ctx),
        );

    ctx.state.effect = match.groups.effect.replace(/ +/, "-").toLowerCase();

    next();
}
