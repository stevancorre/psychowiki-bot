import axios from "axios";

import { Effect } from "./types/Effect";

const EFFECT_INDEX_API_ENDPOINT = "https://www.effectindex.com/api/effects/";

type Response = {
    effect: ResponseEffect;
};

type ResponseEffect = {
    name: string;
    summary_raw: string | undefined;
    external_links: {
        url: string;
        title: string;
    }[];
};

export class EffectsIndexApiProvider {
    public static infos(effect: string): Promise<Effect> {
        const requestUri = `${EFFECT_INDEX_API_ENDPOINT}${effect}`;

        return new Promise((resolve, reject) =>
            axios
                .get<Response>(requestUri)
                .then((response) => {
                    const data: Response | undefined = response.data;
                    if (data?.effect?.summary_raw === undefined) return reject("Effect not found");

                    resolve({
                        url: `https://www.effectindex.com/effects/${effect}`,
                        name: data.effect.name,
                        summary: data.effect.summary_raw,
                        externalLinks: data.effect.external_links,
                    });
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                }),
        );
    }
}
