import { Context } from "telegraf";

export interface Command {
    name: string;
    description: string;
    handler: (ctx: Context) => Promise<void> | void;
}
