import axios from "axios";

import infoQuery from "./queries/info";
import { Substance } from "./types/Substance";

const API_ENDPOINT = "https://api.psychonautwiki.org/";

export class PsychonautWikiProvider {
    public static infos(substance: string): Promise<Substance> {
        const query: string = infoQuery(substance);
        const encodedQuery = encodeURIComponent(query);
        const requestUri = `${API_ENDPOINT}?query=${encodedQuery}`;

        return new Promise((resolve, reject) =>
            axios
                .get(requestUri)
                .then(async (response) => {
                    const substance: Substance | undefined = response.data?.data?.substances?.[0];
                    if (substance === undefined) reject("Substance not found");
                    else resolve(substance);
                })
                .catch((err) => {
                    console.error(err);
                    reject(err);
                }),
        );
    }
}
