import axios from "axios";
import { Context } from "telegraf";
import { Paginator } from "telegraf-paginator";

import bot from "..";
import { API_ENDPOINT } from "../constants/PsychonautWiki";
import { Command } from "../core/command";
import { capitalize, formatMinMax } from "../helpers/formatters";
import { MessageBuilder } from "../helpers/messageBuilder";
import { MessageCategoryBuilder } from "../helpers/messageCategoryBuilder";
import substanceMiddleware from "../middlewares/substanceMiddleware";
import infoQuery from "../queries/info";
import durationAliases from "../tables/durationAliases";
import { Substance } from "../types/Substance";

const InfoCommand: Command = {
    name: "info",
    description: "",
    middlewares: [substanceMiddleware],
    handler: async (ctx: Context) => {
        const query: string = infoQuery(<string>ctx.state.substance);
        const encodedQuery = encodeURIComponent(query);
        const requestUri = `${API_ENDPOINT}?query=${encodedQuery}`;

        axios
            .get(requestUri)
            .then(async (response) => {
                const substance: Substance | undefined = response.data?.data?.substances?.[0];
                if (substance === undefined) {
                    // TODO: reply with error
                    return console.log("substance data not found");
                }

                const paginator = new Paginator(
                    [
                        { title: "⚖️ Dosages", data: buildDosage(substance) },
                        { title: "🕐 Durations", data: buildDuration(substance) },
                        { title: "📈 Tolerance", data: buildTolerance(substance) },
                        { title: "⚠️ Addiction", data: buildAddictionPotential(substance) },
                    ],
                    buildHeader(substance),
                );

                await ctx.reply(paginator.text(), paginator.extra());
                // dw abt this
                paginator.handleAction(bot as unknown as any);
            })
            .catch((err) => {
                // TODO: reply with error
                console.error(err);
            });
    },
};
export default InfoCommand;

const buildHeader = (substance: Substance): string =>
    new MessageBuilder().appendTitle(`${substance.name} drug information`, substance.url).getContent();

const buildDosage = (substance: Substance): string => {
    const dosages: MessageCategoryBuilder = new MessageCategoryBuilder("⚖️", "Dosage");
    for (const roa of substance.roas) {
        if (!roa || !roa.dose || !roa.dose.units) {
            continue;
        }

        dosages.appendLineInTags(`(${capitalize(roa.name)})`, "i");

        dosages.appendField("Threshold", formatMinMax(roa.dose.threshold, roa.dose.units));
        dosages.appendField("Light", formatMinMax(roa.dose.light, roa.dose.units));
        dosages.appendField("Common", formatMinMax(roa.dose.common, roa.dose.units));
        dosages.appendField("Strong", formatMinMax(roa.dose.strong, roa.dose.units));
        dosages.appendField("Heavy", formatMinMax(roa.dose.heavy, roa.dose.units));

        dosages.appendNewLines(1);
    }

    return dosages.getContent();
};

const buildDuration = (substance: Substance): string => {
    const durations: MessageCategoryBuilder = new MessageCategoryBuilder("🕐", "Duration");
    for (const roa of substance.roas) {
        if (!roa || !roa.duration) {
            continue;
        }

        durations.appendLineInTags(`(${capitalize(roa.name)})`, "i");

        durations.appendField(
            "Onset",
            formatMinMax(roa.duration.onset, roa.duration.onset?.units, durationAliases),
        );
        durations.appendField(
            "Comeup",
            formatMinMax(roa.duration.comeup, roa.duration.comeup?.units, durationAliases),
        );
        durations.appendField(
            "Peak",
            formatMinMax(roa.duration.peak, roa.duration.peak?.units, durationAliases),
        );
        durations.appendField(
            "Offset",
            formatMinMax(roa.duration.offset, roa.duration.offset?.units, durationAliases),
        );
        durations.appendField(
            "Afterglow",
            formatMinMax(roa.duration.afterglow, roa.duration.afterglow?.units, durationAliases),
        );
        durations.appendField(
            "Total",
            formatMinMax(roa.duration.total, roa.duration.total?.units, durationAliases),
        );

        durations.appendNewLines(1);
    }

    return durations.getContent();
};

const buildTolerance = (substance: Substance): string =>
    new MessageCategoryBuilder("📈", "Tolerance")
        .appendField("Full", substance.tolerance?.full)
        .appendField("Half", substance.tolerance?.half)
        .appendField("Baseline", substance.tolerance?.zero)
        .getContent();

const buildAddictionPotential = (substance: Substance): string => {
    const addictionPotential: MessageCategoryBuilder = new MessageCategoryBuilder(
        "⚠️",
        "Addiction potential",
    );
    if (substance.addictionPotential) {
        addictionPotential.appendLine(capitalize(substance.addictionPotential));
    }

    return addictionPotential.getContent();
};
