import { Command } from "pwb/core/command";
import { StringBuilder } from "pwb/helpers/stringBuilder";
import { Context } from "telegraf";
import { Chat } from "telegraf/typings/core/types/typegram";

const ChannelCommand: Command = {
    name: "channel",
    description: "Display the current channel infos",
    handler: async (ctx: Context): Promise<void> => {
        const chat = ctx.chat;
        if (!chat) return;

        await ctx.replyToMessageWithHTML(buildChannelInfoMessage(chat));
    },
};
export default ChannelCommand;

const buildChannelInfoMessage = (
    chat: Chat.ChannelChat | Chat.PrivateChat | Chat.GroupChat | Chat.SupergroupChat,
): string =>
    new StringBuilder()
        .appendTitle("Channel informations")
        .appendField("Id", chat.id.toString())
        .appendField("Type", chat.type)
        .getContent();
