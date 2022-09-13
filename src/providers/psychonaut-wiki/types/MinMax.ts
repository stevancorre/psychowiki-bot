export interface MinMax {
    min: number | null;
    max: number | null;
}

export interface MinMaxWithUnits extends MinMax {
    units: string | null;
}
