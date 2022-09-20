import BugCommand from "pwb/commands/bug";
import ChannelCommand from "pwb/commands/channel";
import appConfig from "pwb/core/configuration";
import { Context } from "telegraf";

const ALLOWED_COMMANDS: ReadonlyArray<string> = <const>[ChannelCommand.name, BugCommand.name];

/**
 * Allow command to be executed only in the one present in the configuration
 */
export default async function restrictToMiddleware(ctx: Context, next: () => Promise<void>): Promise<void> {
    const chat = ctx.chat;
    if (chat?.id === undefined) return;

    if (appConfig.restrictTo) {
        const message = ctx.message;

        if (message && "text" in message) {
            const commandWithMaybePing: string | undefined = message.text.split(" ")[0]?.toLowerCase();
            const command: string | undefined = commandWithMaybePing?.split("@")[0]?.replace("/", "");
            if (ALLOWED_COMMANDS.find((x) => x === command)) return next();
        }

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
