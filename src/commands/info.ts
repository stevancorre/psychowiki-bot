import { Context } from "telegraf";
import { Paginator } from "telegraf-paginator";

import bot from "..";
import { Command } from "../core/command";
import { capitalize, formatMinMax } from "../helpers/formatters";
import { StringBuilder } from "../helpers/stringBuilder";
import substanceMiddleware from "../middlewares/substanceMiddleware";
import { PsychonautWikiProvider } from "../providers/psychonaut-wiki";
import { Substance } from "../providers/psychonaut-wiki/types/Substance";
import durationAliases from "../tables/durationAliases";

const InfoCommand: Command = {
    name: "info",
    description: "",
    middlewares: [substanceMiddleware],
    handler: async (ctx: Context) =>
        PsychonautWikiProvider.infos(<string>ctx.state.substance)
            .then(async (substance) => {
                const paginator = new Paginator(
                    [
                        { title: "⚖️ Dosages", data: buildDosage(substance) },
                        { title: "🕐 Durations", data: buildDuration(substance) },
                        { title: "📈 Tolerance", data: buildTolerance(substance) },
                        { title: "⚠️ Addiction", data: buildAddictionPotential(substance) },
                    ],
                    {
                        header: buildHeader(substance),
                        maxPagesPerRow: 2,
                    },
                );

                await ctx.reply(paginator.text(), paginator.extras());
                // dw abt this
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                paginator.handleAction(bot as unknown as any);
            })
            .catch(console.error),
};
export default InfoCommand;

const buildHeader = (substance: Substance): string =>
    new StringBuilder().appendTitle(`${substance.name} drug information`, substance.url).getContent();

const buildDosage = (substance: Substance): string =>
    new StringBuilder()
        .appendCategoryTitle("⚖️", "Dosage")
        .appendFor(substance.roas, (builder, roa) => {
            if (!roa.dose || !roa.dose.units) return;

            builder
                .appendLineInTags(`(${capitalize(roa.name)})`, "i")
                .appendField("Threshold", formatMinMax(roa.dose.threshold, roa.dose.units))
                .appendField("Light", formatMinMax(roa.dose.light, roa.dose.units))
                .appendField("Common", formatMinMax(roa.dose.common, roa.dose.units))
                .appendField("Strong", formatMinMax(roa.dose.strong, roa.dose.units))
                .appendField("Heavy", formatMinMax(roa.dose.heavy, roa.dose.units))
                .appendNewLines(1);
        })
        .getContent();

const buildDuration = (substance: Substance): string =>
    new StringBuilder()
        .appendCategoryTitle("🕐", "Duration")
        .appendFor(substance.roas, (builder, roa) => {
            if (!roa?.duration) return;

            const { onset, comeup, peak, offset, afterglow, total } = roa.duration;

            builder
                .appendLineInTags(`(${capitalize(roa.name)})`, "i")
                .appendField("Onset", formatMinMax(onset, onset?.units, durationAliases))
                .appendField("Comeup", formatMinMax(comeup, comeup?.units, durationAliases))
                .appendField("Peak", formatMinMax(peak, peak?.units, durationAliases))
                .appendField("Offset", formatMinMax(offset, offset?.units, durationAliases))
                .appendField("Afterglow", formatMinMax(afterglow, afterglow?.units, durationAliases))
                .appendField("Total", formatMinMax(total, total?.units, durationAliases))
                .appendNewLines(1);
        })
        .getContent();

const buildTolerance = (substance: Substance): string =>
    new StringBuilder()
        .appendCategoryTitle("📈", "Tolerance")
        .appendField("Full", substance.tolerance?.full)
        .appendField("Half", substance.tolerance?.half)
        .appendField("Baseline", substance.tolerance?.zero)
        .getContent();

const buildAddictionPotential = (substance: Substance): string =>
    new StringBuilder()
        .appendCategoryTitle("⚠️", "Addiction potential")
        .appendIf(substance.addictionPotential !== null, (builder) =>
            // TODO: accept <string | null> to avoid having <>! + eslint-disable rule
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            builder.appendLine(capitalize(substance.addictionPotential!)),
        )
        .getContent();
