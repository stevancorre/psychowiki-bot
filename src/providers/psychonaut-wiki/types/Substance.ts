import { MinMax, MinMaxWithUnits } from "./MinMax";

export interface SubstanceClass {
    chemical: ReadonlyArray<string> | null;
    psychoactive: ReadonlyArray<string> | null;
}

export interface SubstanceTolerance {
    full?: string | null;
    half?: string | null;
    zero?: string | null;
}

export interface SubstanceRoaDosage {
    dosage?: string | null;
    units?: string | null;
    threshold?: MinMax | number | null;
    light?: MinMax | number | null;
    common?: MinMax | number | null;
    strong?: MinMax | null;
    heavy?: number | null;
}

export interface SubstanceRoaDuration {
    onset: MinMaxWithUnits | null;
    comeup: MinMaxWithUnits | null;
    peak: MinMaxWithUnits | null;
    offset: MinMaxWithUnits | null;
    afterglow: MinMaxWithUnits | null;
    total: MinMaxWithUnits | null;
}

export interface SubstanceRoa {
    name: string;
    dose: SubstanceRoaDosage | null;
    duration: SubstanceRoaDuration | null;
}

export interface Substance {
    name: string;
    url: string;
    tolerance: SubstanceTolerance | null;
    roas: ReadonlyArray<SubstanceRoa>;
    class: SubstanceClass | null;
    addictionPotential: string | null;
}
