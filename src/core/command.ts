import { Context, Middleware } from "telegraf";

export interface Command {
    name: string;
    description: string;
    middlewares?: ReadonlyArray<Middleware<Context>>;
    handler: (ctx: Context) => void | Promise<void>;
}
