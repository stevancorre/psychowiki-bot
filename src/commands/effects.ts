import { Command } from "pwb/core/command";
import { capitalize } from "pwb/helpers/formatters";
import { StringBuilder } from "pwb/helpers/stringBuilder";
import substanceMiddleware from "pwb/middlewares/substance";
import { PsychonautWikiApiProvider } from "pwb/providers/psychonaut-wiki";
import { SubstanceEffects } from "pwb/providers/psychonaut-wiki/types/SubstanceEffect";
import { Context } from "telegraf";

const EffectsCommand: Command = {
    name: "effects",
    description: "Give you a list of effects given by a substance",
    middlewares: [substanceMiddleware],
    handler: async (ctx: Context): Promise<void> =>
        PsychonautWikiApiProvider.effects(<string>ctx.state["substance"])
            .then(async (substances) => {
                await ctx.replyToMessageWithHTML(buildSubstanceEffectsMessage(substances));
            })
            .catch(async (error) => {
                await ctx.replyToMessageWithErrorHTML(error);
            }),
};
export default EffectsCommand;

const buildSubstanceEffectsMessage = (substanceEffects: SubstanceEffects): string => {
    const susbtanceEffectsIndexUri = `https://psychonautwiki.org/wiki/${substanceEffects.name}#Subjective_effects`;

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

    return new StringBuilder()
        .appendTitle(`${substanceEffects.name} effect informations`, susbtanceEffectsIndexUri)
        .appendLine(effectsList.getContent())
        .appendLine(moreInformations.getContent())
        .getContent();
};
