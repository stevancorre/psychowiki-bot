import { Context } from "telegraf";

import { Command } from "../core/command";
import { formatExternalLink } from "../helpers/formatters";
import { StringBuilder } from "../helpers/stringBuilder";
import effectMiddleware from "../middlewares/effect";
import { EffectsIndexApiProvider } from "../providers/effect-index";
import { Effect } from "../providers/effect-index/types/Effect";

const EffectInfoCommand: Command = {
    name: "effectinfo",
    description: "Gives you informations about a specific effect",
    middlewares: [effectMiddleware],
    handler: async (ctx: Context) =>
        EffectsIndexApiProvider.infos(<string>ctx.state.effect)
            .then(async (effect) => {
                await ctx.replyToMessageWithHTML(buildEffectInfoMessage(effect));
            })
            .catch(async (error) => {
                await ctx.replyToMessageWithErrorHTML(error);
            }),
};
export default EffectInfoCommand;

const buildEffectInfoMessage = (effectInfo: Effect): string => {
    const summary: StringBuilder = new StringBuilder().appendCategoryTitle("🗒", "Summary");
    summary.appendLine(effectInfo.summary);

    const links: StringBuilder = new StringBuilder().appendCategoryTitle("🔗", "Links");
    links.appendLines(...effectInfo.externalLinks.map((x) => `- ${formatExternalLink(x.title, x.url)}`));

    return new StringBuilder()
        .appendTitle(`${effectInfo.name} effect information`, effectInfo.url)
        .appendLine(summary.getContent())
        .appendLine(links.getContent())
        .getContent();
};
