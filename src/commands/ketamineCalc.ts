import bot from "pwb";
import { Command } from "pwb/core/command";
import { formatInt } from "pwb/helpers/formatters";
import { StringBuilder } from "pwb/helpers/stringBuilder";
import { replyToMessage } from "pwb/helpers/telegraf";
import weightMiddleware, { Weight } from "pwb/middlewares/weight";
import { Context } from "telegraf";
import { Paginator } from "telegraf-paginator";

const KetamineCalcCommand: Command = {
    name: "ketaminecalc",
    description: "Gives you ketamine dosages for a given weight (kg or lbs)",
    middlewares: [weightMiddleware],
    handler: async (ctx: Context): Promise<void> => {
        const weight = <Weight>ctx.state["weight"];
        if (weight.pounds < 20) {
            await ctx.replyToMessageWithErrorHTML("Please give a realistic weight");
            return;
        }

        const paginator = new Paginator(
            [
                { title: "👃 Insufflated", data: buildKetamineCalcInsufflated(weight) },
                { title: "💊 Oral", data: buildKetamineCalcOral(weight) },
                { title: "💉 Intramuscular", data: buildKetamineCalcIntramuscular(weight) },
                { title: "🚀 Rectal", data: buildKetamineCalcRectal(weight) },
            ],
            {
                header: buildKetamineCalcHeader(weight),
                footer: buildKetamineCalcFooter(),
                maxPagesPerRow: 2,
            },
        );

        await ctx.replyWithHTML(paginator.text(), {
            ...paginator.extras(),
            ...replyToMessage(ctx),
        });

        // i'll fix this as unknown as any shits later dw
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        paginator.handleAction(bot as unknown as any);
    },
};
export default KetamineCalcCommand;

const buildKetamineCalcHeader = (weight: Weight): string =>
    new StringBuilder().appendTitle(`Ketamine dosage calculator for <u>${weight.original}</u>`).getContent();

const buildKetamineCalcFooter = (): string =>
    new StringBuilder()
        .appendCategoryTitle("⚠️", "Warning")
        .appendLine(
            `These recommendations are an approximation and are on the lower end for harm reduction purposes, please take into account your own personal tolerance and start with lower dosages.`,
        )
        .getContent();

const buildKetamineCalcInsufflated = (weight: Weight): string =>
    new StringBuilder()
        .appendCategoryTitle("👃", "Insufflated")
        .appendField("Threshold", `${formatInt(weight.pounds * 0.1)}mg`)
        .appendField("Light", `${formatInt(weight.pounds * 0.15)}mg`)
        .appendField("Common", `${formatInt(weight.pounds * 0.3)}mg`)
        .appendField("Strong", `${formatInt(weight.pounds * 0.5)}mg - ${formatInt(weight.pounds * 0.75)}mg`)
        .appendField("K-hole", `${formatInt(weight.pounds)}mg`)
        .getContent();

const buildKetamineCalcOral = (weight: Weight): string =>
    new StringBuilder()
        .appendCategoryTitle("💊", "Oral")
        .appendField("Threshold", `${formatInt(weight.pounds * 0.3)}mg`)
        .appendField("Light", `${formatInt(weight.pounds * 0.6)}mg`)
        .appendField("Common", `${formatInt(weight.pounds * 0.75)}mg - ${formatInt(weight.pounds * 2)}mg`)
        .appendField("Strong", `${formatInt(weight.pounds * 2)}mg - ${formatInt(weight.pounds * 2.5)}mg`)
        .appendField("K-hole", `${formatInt(weight.pounds * 3)}mg - ${formatInt(weight.pounds * 4)}mg`)
        .getContent();

const buildKetamineCalcIntramuscular = (weight: Weight): string =>
    new StringBuilder()
        .appendCategoryTitle("💉", "Intramuscular")
        .appendField("Threshold", `${formatInt(weight.pounds * 0.1)}mg`)
        .appendField("Light", `${formatInt(weight.pounds * 0.15)}mg`)
        .appendField("Common", `${formatInt(weight.pounds * 0.2)}mg`)
        .appendField("Strong", `${formatInt(weight.pounds * 0.5)}mg`)
        .appendField("K-hole", `${formatInt(weight.pounds * 0.75)}mg`)
        .appendField("Anesthetic", `${formatInt(weight.pounds)}mg`)
        .getContent();

const buildKetamineCalcRectal = (weight: Weight): string =>
    new StringBuilder()
        .appendCategoryTitle("🚀", "Rectal")
        .appendField("Threshold", `${formatInt(weight.pounds * 0.3)}mg`)
        .appendField("Light", `${formatInt(weight.pounds * 0.6)}mg`)
        .appendField("Common", `${formatInt(weight.pounds * 0.75)}mg - ${formatInt(weight.pounds * 2)}mg`)
        .appendField("Strong", `${formatInt(weight.pounds * 2)}mg - ${formatInt(weight.pounds * 2.5)}mg`)
        .appendField("K-hole", `${formatInt(weight.pounds * 3)}mg - ${formatInt(weight.pounds * 4)}mg`)
        .getContent();
