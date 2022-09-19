import appConfig from "pwb/core/configuration";
import { Context } from "telegraf";

/**
 * Allow command to be executed only in the one present in the configuration
 */
export default async function restrictToMiddleware(ctx: Context, next: () => Promise<void>): Promise<void> {
    const chat = ctx.chat;

    if (chat?.id === undefined) return;
    if (appConfig.restrictTo) {
        if (chat.type === "private") {
            await ctx.replyToMessageWithErrorHTML(
                "The bot isn't currently available in private.\nIt is currently in early alpha, and will be open to everyone soon",
            );
            return;
        }
        if (appConfig.restrictTo.find((x) => x === chat.id) === undefined) {
            await ctx.replyToMessageWithErrorHTML(
                "The bot isn't currently available in this channel.\nIt is currently in early alpha, and will be open to everyone soon",
            );
            return;
        }
    }

    next();
}
