import { Command } from "pwb/core/command";
import { Message } from "telegraf/typings/core/types/typegram";

declare module "telegraf" {
    interface Telegraf {
        setMyCommands(commands: ReadonlyArray<Command>): Promise<void>;
    }

    interface Context {
        replyToMessageWithErrorHTML(error: string): Promise<Message>;
        replyToMessageWithHTML(error: string): Promise<Message>;
        replyToMessageWithPhoto(photo: string): Promise<Message>;
        replyToMessageWithVideo(photo: string): Promise<Message>;
    }
}

export {};
