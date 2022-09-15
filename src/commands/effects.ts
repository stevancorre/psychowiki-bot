import { Context } from "telegraf";

import { Command } from "../core/command";
import { capitalize } from "../helpers/formatters";
import { StringBuilder } from "../helpers/stringBuilder";
import substanceMiddleware from "../middlewares/substanceMiddleware";
import { PsychonautWikiApiProvider } from "../providers/psychonaut-wiki";
import { SubstanceEffects } from "../providers/psychonaut-wiki/types/Effect";

const EffectsCommand: Command = {
    name: "effects",
    description: "",
    middlewares: [substanceMiddleware],
    handler: async (ctx: Context) =>
        PsychonautWikiApiProvider.effects(<string>ctx.state.substance)
            .then(async (substances) => {
                console.log(substances);

                await ctx.reply(buildSubstanceEffectsMessage(substances), { parse_mode: "HTML" });
            })
            .catch(console.error),
};
export default EffectsCommand;

const buildSubstanceEffectsMessage = (substanceEffects: SubstanceEffects): string => {
    const susbtanceEffectsIndexUri = `https://psychonautwiki.org/wiki/${substanceEffects.name}#Subjective_effects`;

    const messageBuilder: StringBuilder = new StringBuilder().appendTitle(
        `${substanceEffects.name} effect informations`,
        susbtanceEffectsIndexUri,
    );

    const effectsList: StringBuilder = new StringBuilder()
        .appendCategoryTitle("🗒", "Effects (randomly selected)")
        .appendLines(
            ...substanceEffects.effects.map((x) => {
                if (x.url) return `- <a href="${x.url}">${capitalize(x.name)}</a>`;

                return `- ${capitalize(x.name)}`;
            }),
        );

    const moreInformations: StringBuilder = new StringBuilder()
        .appendCategoryTitle("➕", "More informations")
        .appendLine(
            `These effects were randomly selected from a larger list - <a href="${susbtanceEffectsIndexUri}">see all effects</a>`,
        );

    messageBuilder.appendLine(effectsList.getContent()).appendLine(moreInformations.getContent());

    return messageBuilder.getContent();
};
