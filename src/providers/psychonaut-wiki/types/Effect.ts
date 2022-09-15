export interface SubstanceEffects {
    name: string;
    effects: Effect[];
}

export interface Effect {
    name: string;
    url?: string;
}

export interface EffectInfo {
    summary_raw: string;
    name: string;
    external_links: EffectInfoExternalLink[];
}

export interface EffectInfoExternalLink {
    url: string;
    title: string;
}
