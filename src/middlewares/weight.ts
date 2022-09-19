import { Context } from "telegraf";

import { replyToMessage } from "../helpers/telegraf";

export interface Weight {
    original: string;
    pounds: number;
}

export default async function weightMiddleware(ctx: Context, next: () => Promise<void>) {
    const message = ctx.message;
    if (message === undefined) return;
    if (!("text" in message)) return;

    const command: string = message.text.split(" ")[0];
    const source: string = message.text.substring(command.length).trim();

    const match = /^(?<weight>\d+)(?:.\d+)?(?: +)?(?<units>kg|kilo|pound|lb)s?/gim.exec(source);
    if (match === null || match.groups === undefined)
        return await ctx.replyWithMarkdownV2(
            `Usage: \`${command} <weight>\`\nExample: \`${command} 70 kg\` or \`${command} 150 lb\``,
            replyToMessage(ctx),
        );

    const units = match.groups.units.toLowerCase().startsWith("k") ? "kg" : "lb";
    const weight = parseFloat(match.groups.weight);
    const pounds = weight * (units === "kg" ? 2.2 : 1);

    if (weight <= 0) return await ctx.reply(`❌ You can't weight less than 0 ${units}!`);

    ctx.state.weight = <Weight>{
        original: `${weight.toFixed()} ${units}`,
        pounds,
    };

    next();
}
