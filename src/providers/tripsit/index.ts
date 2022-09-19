import axios from "axios";
import logger from "pwb/core/logging";

import { prettySubstance } from "pwb/tables/prettySubstances";
import { SubstanceCombos } from "./types/SubstanceCombos";

const TRIPSIT_API_ENDPOINT = "http://tripbot.tripsit.me/api/tripsit/getDrug";

type Response = {
    data: ({ combos: Combos } | undefined)[] | undefined;
};

type Combos = Record<string, { status: string }>;

const labels: Record<string, keyof SubstanceCombos> = <const>{
    Unsafe: "unsafe",
    Caution: "caution",
    "Low Risk & Decrease": "lowRiskAndDecrease",
    "Low Risk & No Synergy": "lowRiskNoSynergy",
    "Low Risk & Synergy": "lowRiskAndSynergy",
    Dangerous: "dangerous",
};

export class TripSitApiProvider {
    public static combos(substance: string): Promise<SubstanceCombos> {
        const requestUri = `${TRIPSIT_API_ENDPOINT}?name=${substance}`;

        return new Promise((resolve, reject) =>
            axios
                .get<Response>(requestUri)
                .then(async (response) => {
                    const combos: Combos | undefined = response.data?.data?.[0]?.combos;
                    if (!combos) return reject("Either substance not found or no data for available");

                    const result: SubstanceCombos = {
                        unsafe: [],
                        caution: [],
                        lowRiskAndDecrease: [],
                        lowRiskNoSynergy: [],
                        lowRiskAndSynergy: [],
                        dangerous: [],
                    };

                    for (const [k, v] of Object.entries(combos)) {
                        const key: keyof SubstanceCombos | undefined = labels[v.status];
                        if(!key) continue;

                        const name: string = prettySubstance(k);
                        result[key].push(name);
                    }

                    resolve(result);
                })
                .catch(async (error) => {
                    logger.error(error);
                    reject(error);
                }),
        );
    }
}
