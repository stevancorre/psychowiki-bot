import { Context } from "telegraf";
import { Paginator } from "telegraf-paginator";

import bot from "..";
import { Command } from "../core/command";
import { formatInt } from "../helpers/formatters";
import { MessageBuilder } from "../helpers/messageBuilder";
import { MessageCategoryBuilder } from "../helpers/messageCategoryBuilder";
import weightMiddleware, { Weight } from "../middlewares/weightMiddleware";

const KetamineCalcCommand: Command = {
    name: "ketaminecalc",
    description: "",
    middlewares: [weightMiddleware],
    handler: async (ctx: Context) => {
        const weight = <Weight>ctx.state.weight;
        if (weight.pounds < 20) {
            // TODO: better error messages
            await ctx.reply("Please give a realistic weight");
            return;
        }

        const paginator = new Paginator(
            [
                { title: "👃 Insufflated", data: buildKetamineCalcInsufflated(weight) },
                { title: "💊 Oral", data: buildKetamineCalcOral(weight) },
                { title: "💉 Intramuscular", data: buildKetamineCalcIntramuscular(weight) },
                { title: "🚀 Rectal", data: buildKetamineCalcRectal(weight) },
            ],
            buildKetamineCalcHeader(weight),
        );

        await ctx.replyWithHTML(paginator.text(), paginator.extra());

        // i'll fix this as unknown as any shits later dw
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        paginator.handleAction(bot as unknown as any);
    },
};
export default KetamineCalcCommand;

const buildKetamineCalcHeader = (weight: Weight): string =>
    new MessageBuilder().appendTitle(`Ketamine dosage calculator for <u>${weight.original}</u>`).getContent();

const buildKetamineCalcInsufflated = (weight: Weight): string =>
    new MessageCategoryBuilder("👃", "Insufflated")
        .appendField("Threshold", `${formatInt(weight.pounds * 0.1)}mg`)
        .appendField("Light", `${formatInt(weight.pounds * 0.15)}mg`)
        .appendField("Common", `${formatInt(weight.pounds * 0.3)}mg`)
        .appendField("Strong", `${formatInt(weight.pounds * 0.5)}mg - ${formatInt(weight.pounds * 0.75)}mg`)
        .appendField("K-hole", `${formatInt(weight.pounds)}mg`)
        .getContent();

const buildKetamineCalcOral = (weight: Weight): string =>
    new MessageCategoryBuilder("💊", "Oral")
        .appendField("Threshold", `${formatInt(weight.pounds * 0.3)}mg`)
        .appendField("Light", `${formatInt(weight.pounds * 0.6)}mg`)
        .appendField("Common", `${formatInt(weight.pounds * 0.75)}mg - ${formatInt(weight.pounds * 2)}mg`)
        .appendField("Strong", `${formatInt(weight.pounds * 2)}mg - ${formatInt(weight.pounds * 2.5)}mg`)
        .appendField("K-hole", `${formatInt(weight.pounds * 3)}mg - ${formatInt(weight.pounds * 4)}mg`)
        .getContent();

const buildKetamineCalcIntramuscular = (weight: Weight): string =>
    new MessageCategoryBuilder("💉", "Intramuscular")
        .appendField("Threshold", `${formatInt(weight.pounds * 0.1)}mg`)
        .appendField("Light", `${formatInt(weight.pounds * 0.15)}mg`)
        .appendField("Common", `${formatInt(weight.pounds * 0.2)}mg`)
        .appendField("Strong", `${formatInt(weight.pounds * 0.5)}mg`)
        .appendField("K-hole", `${formatInt(weight.pounds * 0.75)}mg`)
        .appendField("Anesthetic", `${formatInt(weight.pounds)}mg`)
        .getContent();

const buildKetamineCalcRectal = (weight: Weight): string =>
    new MessageCategoryBuilder("🚀", "Rectal")
        .appendField("Threshold", `${formatInt(weight.pounds * 0.3)}mg`)
        .appendField("Light", `${formatInt(weight.pounds * 0.6)}mg`)
        .appendField("Common", `${formatInt(weight.pounds * 0.75)}mg - ${formatInt(weight.pounds * 2)}mg`)
        .appendField("Strong", `${formatInt(weight.pounds * 2)}mg - ${formatInt(weight.pounds * 2.5)}mg`)
        .appendField("K-hole", `${formatInt(weight.pounds * 3)}mg - ${formatInt(weight.pounds * 4)}mg`)
        .getContent();
