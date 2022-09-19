import { replyToMessage } from "pwb/helpers/telegraf";
import { Context } from "telegraf";

export interface Weight {
    original: string;
    pounds: number;
}

/**
 * Makes sure a valid weight (e.g: 50kg, 50 lbs, 50 kgs) is passed as an argument, then convert to pounds
 */
export default async function weightMiddleware(ctx: Context, next: () => Promise<void>): Promise<void> {
    const message = ctx.message;
    if (message === undefined) return;
    if (!("text" in message)) return;

    const command: string | undefined = message.text.split(" ")[0];
    if (!command) return;
    const source: string = message.text.substring(command.length).trim();

    const match = /^(?<weight>\d+)(?:.\d+)?(?: +)?(?<units>kg|kilo|pound|lb)s?/gim.exec(source);
    if (!match || !match.groups?.["units"] || !match.groups?.["weight"]) {
        await ctx.replyWithMarkdownV2(
            `Usage: \`${command} <weight>\`\nExample: \`${command} 70 kg\` or \`${command} 150 lb\``,
            replyToMessage(ctx),
        );
        return;
    }

    const units = match.groups["units"].toLowerCase().startsWith("k") ? "kg" : "lb";
    const weight = parseFloat(match.groups["weight"]);
    const pounds = weight * (units === "kg" ? 2.2 : 1);

    if (weight <= 0) {
        await ctx.reply(`❌ You can't weight less than 0 ${units}!`);
        return;
    }

    ctx.state["weight"] = <Weight>{
        original: `${weight.toFixed()} ${units}`,
        pounds,
    };

    next();
}
