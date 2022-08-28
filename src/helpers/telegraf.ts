import { Context } from "telegraf";

export const replyToMessage = (ctx: Context) => ({
    reply_to_message_id: ctx.message?.message_id,
});
