import { Context } from "telegraf";
import { Message } from "telegraf/typings/core/types/typegram";

export const replyToMessage = (ctx: Context) => ({
    reply_to_message_id: ctx.message?.message_id,
});

Context.prototype.replyToMessageWithErrorHTML = async function (error: string): Promise<Message> {
    return await this.replyToMessageWithHTML(`❌ ${error}`);
};

Context.prototype.replyToMessageWithHTML = async function (message: string): Promise<Message> {
    return await this.replyWithHTML(message, replyToMessage(this));
};

Context.prototype.replyToMessageWithPhoto = async function (photo: string): Promise<Message> {
    return await this.replyWithPhoto(photo, replyToMessage(this));
};

Context.prototype.replyToMessageWithVideo = async function (video: string): Promise<Message> {
    return await this.replyWithVideo(video, replyToMessage(this));
};
