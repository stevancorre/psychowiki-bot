import axios from "axios";
import { randomInt } from "crypto";
import logger from "pwb/core/logging";

import effectsQuery from "./queries/effects";
import infoQuery from "./queries/info";
import { Substance } from "./types/Substance";
import { SubstanceEffect, SubstanceEffects } from "./types/SubstanceEffect";

const API_ENDPOINT = "https://api.psychonautwiki.org/";
const MAX_EFFECT_COUNT = 10;

export class PsychonautWikiApiProvider {
    /**
     * Fetches informations about a given substance from the PsychonautWiki API
     */
    public static infos(substance: string): Promise<Substance> {
        const requestUri: string = this.buildRequestUri(infoQuery(substance));

        return new Promise((resolve, reject) =>
            axios
                .get(requestUri)
                .then(async (response) => {
                    const substance: Substance | undefined = response.data?.data?.substances?.[0];
                    if (substance === undefined) reject("Substance not found");
                    else resolve(substance);
                })
                .catch(() => reject("Substance not found")),
        );
    }

    /**
     * Fetches effect informations about a given substance from the PsychonautWiki API
     */
    public static effects(substance: string): Promise<SubstanceEffects> {
        const requestUri: string = this.buildRequestUri(effectsQuery(substance));

        return new Promise((resolve, reject) =>
            axios
                .get(requestUri)
                .then(async (response) => {
                    const responsSubstance = response.data?.data?.substances?.[0];
                    const effects: SubstanceEffect[] | undefined = responsSubstance?.effects;
                    if (effects === undefined) reject(`No effects infos available for ${substance}`);
                    else {
                        if (effects.length > MAX_EFFECT_COUNT) {
                            const countOfEffectsToRemove: number = effects.length - MAX_EFFECT_COUNT;
                            for (let i = 0; i < countOfEffectsToRemove; i++) {
                                effects.splice(randomInt(effects.length), 1);
                            }
                        }

                        resolve({
                            name: responsSubstance.name,
                            effects,
                        });
                    }
                })
                .catch((error) => {
                    logger.error(error);
                    reject("Error while fetching api data");
                }),
        );
    }

    private static buildRequestUri(query: string) {
        const encodedQuery = encodeURIComponent(query);
        return `${API_ENDPOINT}?query=${encodedQuery}`;
    }
}
