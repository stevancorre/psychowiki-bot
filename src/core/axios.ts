import axiosModule from "axios";
import axiosCache from "axios-cache-adapter";

import { env } from "./env";

const cache = axiosCache.setupCache({
    maxAge: env.CACHE_LIFETIME * 60 * 1000,
});

const axios = axiosModule.create({
    adapter: cache.adapter,
});

export default axios;
