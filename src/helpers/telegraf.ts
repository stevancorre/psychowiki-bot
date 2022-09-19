import axios from "axios";
import { Command } from "pwb/core/command";
import appConfig from "pwb/core/configuration";
import { Context, Telegraf } from "telegraf";
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

Telegraf.prototype.setMyCommands = async function (commands: ReadonlyArray<Command>): Promise<void> {
    const data = {
        commands: commands.map((x) => ({
            command: x.name,
            description: x.description,
        })),
    };

    const url = `https://api.telegram.org/bot${appConfig.token}/setMyCommands`;
    return axios.post(url, data);
};
