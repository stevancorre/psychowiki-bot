export interface Effect {
    url: string;
    name: string;
    summary: string;
    externalLinks: ReadonlyArray<EffectExternalLink>;
}

export interface EffectExternalLink {
    url: string;
    title: string;
}
