import { Context } from "telegraf";

import { Command } from "../core/command";
import { formatInt } from "../helpers/formatters";
import { StringBuilder } from "../helpers/stringBuilder";
import { replyToMessage } from "../helpers/telegraf";
import weightMiddleware, { Weight } from "../middlewares/weight";

const DxmCalcCommand: Command = {
    name: "dxmcalc",
    description: "Gives you approximate dosages for different DXM plateaus",
    middlewares: [weightMiddleware],
    handler: async (ctx: Context) => {
        const weight = <Weight>ctx.state.weight;
        if (weight.pounds < 20) {
            // TODO: better error messages
            await ctx.reply("Please give a realistic weight");
            return;
        }

        const dosages: string = buildDxmCalcMessage(<Weight>ctx.state.weight);
        await ctx.replyWithHTML(dosages, replyToMessage(ctx));
    },
};
export default DxmCalcCommand;

const buildDxmCalcMessage = (weight: Weight): string => {
    const doseModifier = (2 * Math.log(weight.pounds)) / Math.log(125) - 1;
    const lightMin: number = 100 * doseModifier;
    const lightMaxCommonMin: number = 200 * doseModifier;
    const commonMaxStrongMin: number = 400 * doseModifier;
    const strongMaxHeavy: number = 700 * doseModifier;

    return new StringBuilder()
        .appendTitle(`DXM dosage calculator for <u>${weight.original}</u>`)
        .appendCategoryTitle("⚖️", "Dosages")
        .appendField("First plateau", `${formatInt(lightMin)}mg - ${formatInt(lightMaxCommonMin)}mg`)
        .appendField(
            "Second plateau",
            `${formatInt(lightMaxCommonMin)}mg - ${formatInt(commonMaxStrongMin)}mg`,
        )
        .appendField("Third plateau", `${formatInt(commonMaxStrongMin)}mg - ${formatInt(strongMaxHeavy)}mg`)
        .appendField("Fourth plateau", `${formatInt(strongMaxHeavy)}+mg`)
        .appendNewLines(1)
        .appendCategoryTitle("⚠️", "Warning")
        .appendLine(
            `These recommendations are an approximation and are on the lower end for harm reduction purposes, please take into account your own personal tolerance and start with lower dosages. Doses exceeding 1500mg are potentially fatal.`,
        )
        .getContent();
};
