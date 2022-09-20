export interface SubstanceEffects {
    name: string;
    effects: ReadonlyArray<SubstanceEffect>;
}

export interface SubstanceEffect {
    name: string;
    url?: string;
}
