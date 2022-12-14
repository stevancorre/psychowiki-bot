import { Command } from "pwb/core/command";
import { formatInt } from "pwb/helpers/formatters";
import { StringBuilder } from "pwb/helpers/stringBuilder";
import weightMiddleware, { Weight } from "pwb/middlewares/weight";
import { Context } from "telegraf";

const DxmCalcCommand: Command = {
    name: "dxmcalc",
    description: "Gives you approximate dosages for different DXM plateaus",
    middlewares: [weightMiddleware],
    handler: async (ctx: Context): Promise<void> => {
        const weight = <Weight>ctx.state["weight"];
        if (weight.pounds < 20) {
            await ctx.replyToMessageWithErrorHTML("Please give a realistic weight");
            return;
        }

        const dosages: string = buildDxmCalcMessage(<Weight>ctx.state["weight"]);
        await ctx.replyToMessageWithHTML(dosages);
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
