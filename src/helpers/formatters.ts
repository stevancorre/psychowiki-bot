import { MinMax } from "../providers/psychonaut-wiki/types/MinMax";
import { StringBuilder } from "./stringBuilder";

export function formatMinMax(
    value: MinMax | number | null | undefined,
    units: string | null | undefined,
    unitAliases?: ReadonlyMap<string, string>,
): string {
    if (!value || !units) return "";
    if (unitAliases) units = unitAliases.get(units) ?? units;
    // example: 40mg
    if (typeof value === "number") return `${value}${units}`;

    // example: 40mg - 50mg
    // here, we handle cases were either `min` or `max` is undefined
    const builder: StringBuilder = new StringBuilder();
    if (value.min) {
        builder.append(`${value.min}${units}`);
        if (value.max) builder.append(` - ${value.max}${units}`);
    } else if (value.max) builder.append(`${value.max}${units}`);

    return builder.getContent();
}

export function capitalize(value: string): string {
    return value[0].toUpperCase() + value.slice(1);
}

export function formatExternalLink(title: string, url: string): string {
    title = capitalize(title.replace(/\(.*\)/gm, "").trim());
    const websiteNameAndDomain: string = url
        .replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n?]+)(.*)$/gim, "$1")
        .trim()
        .toLowerCase();

    return `${title}: <a href="${url}">${websiteNameAndDomain}</a>`;
}

export function formatInt(n: number) {
    return n.toFixed(0);
}
