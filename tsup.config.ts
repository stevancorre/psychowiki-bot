import { Options } from "tsup";

const options: Options = {
    name: "tsup",
    target: "node16",
    entry: ["src/index.ts"],
    outDir: "dist",
    sourcemap: true,
    clean: true,
};
export default options;
