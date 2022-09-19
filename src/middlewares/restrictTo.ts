import { Context } from "telegraf";

import appConfig from "../core/configuration";

export default async function restrictToMiddleware(ctx: Context, next: () => Promise<void>) {
    const chat = ctx.chat;

    if (chat?.id === undefined) return;
    if (appConfig.restrictTo) {
        if (chat.type === "private")
            return await ctx.reply(
                "The bot isn't currently available in private.\nIt is currently in early alpha, and will be open to everyone soon",
            );
        if (appConfig.restrictTo.find((x) => x === chat.id) === undefined)
            return await ctx.reply(
                "The bot isn't currently available in this channel.\nIt is currently in early alpha, and will be open to everyone soon",
            );
    }

    next();
}
