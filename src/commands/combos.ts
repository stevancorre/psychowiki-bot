import { Context } from "telegraf";
import { Page, Paginator } from "telegraf-paginator";

import bot from "..";
import { Command } from "../core/command";
import { StringBuilder } from "../helpers/stringBuilder";
import substanceMiddleware from "../middlewares/substanceMiddleware";
import { TripSitApiProvider } from "../providers/tripsit";
import { prettySubstanceName } from "../tables/prettySubstanceNames";

const CombosCommand: Command = {
    name: "combos",
    description: "",
    middlewares: [substanceMiddleware],
    handler: async (ctx: Context) => {
        const susbtance: string = <string>ctx.state.substance;
        TripSitApiProvider.combos(susbtance)
            .then(async (combos) => {
                const pages: Page[] = [
                    buildCombosPage("❌", "Dangerous", combos.dangerous),
                    buildCombosPage("⚠️", "Caution", combos.caution),
                    buildCombosPage("⬆️", "Low Risks & Synergy", combos.caution),
                    buildCombosPage("⏺", "Low Risks & No Synergy", combos.caution),
                    buildCombosPage("⬇️", "Low Risks & Decrease", combos.caution),
                ].filter((x) => x.data.length > 0);

                const paginator = new Paginator(pages, {
                    maxPagesPerRow: 2,
                    header: buildCombosMessageHeader(prettySubstanceName(susbtance)),
                    footer: buildCombosMessageFooter(),
                });

                await ctx.reply(paginator.text(), paginator.extras());
                // dw abt this
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                paginator.handleAction(bot as unknown as any);
            })
            .catch(console.error);
    },
};
export default CombosCommand;

const buildCombosMessageHeader = (substance: string): string =>
    new StringBuilder()
        .appendTitle(
            `${prettySubstanceName(substance)} combos informations`,
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

const buildCombosPage = (icon: string, title: string, combos: string[]) => ({
    title: `${icon} ${title}`,
    data: combos.length > 0 ? buildCombosCategory(icon, title, combos) : "",
});

const buildCombosCategory = (icon: string, title: string, combos: string[]): string =>
    new StringBuilder()
        .appendCategoryTitle(icon, title)
        .appendFor(combos, (builder, substance) => builder.appendLine(`- ${prettySubstanceName(substance)}`))
        .getContent();
