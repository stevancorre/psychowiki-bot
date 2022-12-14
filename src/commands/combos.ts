import bot from "pwb";
import { Command } from "pwb/core/command";
import { StringBuilder } from "pwb/helpers/stringBuilder";
import { replyToMessage } from "pwb/helpers/telegraf";
import substanceMiddleware from "pwb/middlewares/substance";
import { TripSitApiProvider } from "pwb/providers/tripsit";
import { prettySubstance } from "pwb/tables/prettySubstances";
import { Context } from "telegraf";
import { Page, Paginator } from "telegraf-paginator";

const CombosCommand: Command = {
    name: "combos",
    description: "Send the available combo data for a specific substance",
    middlewares: [substanceMiddleware],
    handler: async (ctx: Context): Promise<void> => {
        const susbtance: string = <string>ctx.state["substance"];
        TripSitApiProvider.combos(susbtance)
            .then(async (combos) => {
                // build pages and keep only non-empty pages
                const pages: ReadonlyArray<Page> = [
                    buildCombosPage("❌", "Dangerous", combos.dangerous),
                    buildCombosPage("⚠️", "Caution", combos.caution),
                    buildCombosPage("⬆️", "Low Risks & Synergy", combos.caution),
                    buildCombosPage("⏺", "Low Risks & No Synergy", combos.caution),
                    buildCombosPage("⬇️", "Low Risks & Decrease", combos.caution),
                ].filter((x) => x.data.length > 0);

                const paginator = new Paginator(pages, {
                    maxPagesPerRow: 2,
                    header: buildCombosMessageHeader(prettySubstance(susbtance)),
                    footer: buildCombosMessageFooter(),
                });

                await ctx.reply(paginator.text(), {
                    ...paginator.extras(),
                    ...replyToMessage(ctx),
                });
                // dw abt this
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                paginator.handleAction(bot as unknown as any);
            })
            .catch(async (error) => {
                await ctx.replyToMessageWithErrorHTML(error);
            });
    },
};
export default CombosCommand;

const buildCombosMessageHeader = (substance: string): string =>
    new StringBuilder()
        .appendTitle(
            `${prettySubstance(substance)} combos informations`,
            `https://psychonautwiki.org/wiki/${substance}`,
        )
        .getContent();

const buildCombosMessageFooter = (): string =>
    new StringBuilder()
        .appendCategoryTitle("⚠️", "Warning")
        .appendLine(
            "Mixing drugs requires a great knowledge of the substances in question and to lower the dosages. <b>These informations are not sufficient enough</b> to prepare a combo but is there only to have an overview of the interactions",
        )
        .getContent();

const buildCombosPage = (icon: string, title: string, combos: ReadonlyArray<string>): Page => ({
    // if there are any combo, build the category, otherwhise nothing
    title: `${icon} ${title}`,
    data: combos.length > 0 ? buildCombosCategory(icon, title, combos) : "",
});

const buildCombosCategory = (icon: string, title: string, combos: ReadonlyArray<string>): string =>
    new StringBuilder()
        .appendCategoryTitle(icon, title)
        .appendFor(combos, (builder, substance) => builder.appendLine(`- ${prettySubstance(substance)}`))
        .getContent();
