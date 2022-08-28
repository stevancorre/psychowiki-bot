import { Context, Telegraf } from "telegraf";

import { commands } from "../commands";

export interface Command {
    name: string;
    description: string;
    handler: (ctx: Context) => Promise<void> | void;
}

export const registerCommands = (bot: Telegraf) => {
    for (const command of commands) {
        bot.command(command.name, command.handler);
    }

    // todo: set bot commands
};
