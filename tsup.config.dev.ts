import { defineConfig } from "tsup";

import config from "./tsup.config";

export default defineConfig({
    ...config,
    onSuccess: "eslint . --fix && node dist/index.mjs",
    clean: true,
});
