import { Context } from "telegraf";

import { replyToMessage } from "../helpers/telegraf";
import { findSubstance } from "../tables/substances";

export default async function substanceMiddleware(ctx: Context, next: () => Promise<void>) {
    const message = ctx.message;
    if (message === undefined) return;
    if (!("text" in message)) return;

    const command: string = message.text.split(" ")[0];
    const source: string = message.text.substring(command.length).trim();

    const match = /^(?<substance>.*\S.*)$/gim.exec(source);
    if (match === null || match.groups === undefined)
        return await ctx.replyWithMarkdownV2(
            `Usage: \`${command} <substance>\`\nExample: \`${command} ketamine\``,
            replyToMessage(ctx),
        );

    ctx.state.substance = findSubstance(match.groups.substance);

    next();
}
