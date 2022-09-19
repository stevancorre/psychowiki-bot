export const substancesAliases: Record<string, string | string[]> = {
    ketamine: ["ket", "k"],
    "2c-b": ["2cb", "2c b"],
};

export const findSubstance = (substance: string): string | undefined => {
    substance = substance.toLowerCase();
    return (
        Object.entries(substancesAliases).find(([k, v]) => {
            const substanceInV =
                typeof v === "string"
                    ? v.toLowerCase() === substance
                    : v.find((x) => x.toLowerCase() === substance);
            return k.toLowerCase() === substance || substanceInV;
        })?.[0] ?? substance
    );
};
