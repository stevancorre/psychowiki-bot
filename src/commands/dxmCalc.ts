import { Context } from "telegraf";

import { Command } from "../core/command";
import { formatInt } from "../helpers/formatters";
import { MessageBuilder } from "../helpers/messageBuilder";
import { MessageCategoryBuilder } from "../helpers/messageCategoryBuilder";
import { replyToMessage } from "../helpers/telegraf";
import weightMiddleware, { Weight } from "../middlewares/weightMiddleware";

const DxmCalcCommand: Command = {
    name: "dxmcalc",
    description: "",
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

    const messageBuilder = new MessageBuilder();
    messageBuilder.setCategoriesSpacing(1);
    messageBuilder.appendTitle(`DXM dosage calculator for <u>${weight.original}</u>`);

    const dosages = new MessageCategoryBuilder("⚖️", "Dosages");
    dosages.appendField("First plateau", `${formatInt(lightMin)}mg - ${formatInt(lightMaxCommonMin)}mg`);
    dosages.appendField(
        "Second plateau",
        `${formatInt(lightMaxCommonMin)}mg - ${formatInt(commonMaxStrongMin)}mg`,
    );
    dosages.appendField(
        "Third plateau",
        `${formatInt(commonMaxStrongMin)}mg - ${formatInt(strongMaxHeavy)}mg`,
    );
    dosages.appendField("Fourth plateau", `${formatInt(strongMaxHeavy)}+mg`);

    const warning = new MessageCategoryBuilder("⚠️", "Warning");
    warning.appendLine(
        `These recommendations are an approximation and are on the lower end for harm reduction purposes, please take into account your own personal tolerance and start with lower dosages. Doses exceeding 1500mg are potentially fatal.`,
    );

    messageBuilder.appendCategory(dosages);
    messageBuilder.appendCategory(warning);

    return messageBuilder.getContent();
};
