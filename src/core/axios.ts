import axiosModule from "axios";
import axiosCache from "axios-cache-adapter";

import appConfig from "./configuration";

const cache = axiosCache.setupCache({
    maxAge: appConfig.cacheLifetime * 60 * 1000,
});

const axios = axiosModule.create({
    adapter: cache.adapter,
});

export default axios;
