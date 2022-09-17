export interface Effect {
    url: string;
    name: string;
    summary: string;
    externalLinks: EffectExternalLink[];
}

export interface EffectExternalLink {
    url: string;
    title: string;
}
