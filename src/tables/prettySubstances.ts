export const prettySubstances: Record<string, string> = <const>{
    lsd: "LSD",
    mushrooms: "Mushrooms",
    dmt: "DMT",
    mescaline: "Mescaline",
    dox: "DOx",
    nbomes: "NBOMes",
    "2c-x": "2C-x",
    "2c-t-x": "2C-T-x",
    "5-meo-xxt": "5-MEO-xxT",
    cannabis: "Cannabis",
    ketamine: "Ketamine",
    mxe: "MXE",
    dxm: "DXM",
    nitrous: "Nitrous",
    amphetamines: "Amphetamines",
    mdma: "MDMA",
    cocaine: "Cocaine",
    caffeine: "Caffeine",
    alcohol: "Alcohol",
    "ghb/gbl": "GHB/GBL",
    opioids: "Opioids",
    tramadol: "Tramadol",
    benzodiazepines: "Benzodiazepines",
    benzos: "Benzodiazepines",
    maois: "MAOIs",
    ssris: "SSRIs",
    pcp: "PCP",
    amt: "AMT",
};

export const prettySubstance = (substance: string): string => {
    return prettySubstances[substance] ?? substance;
};
