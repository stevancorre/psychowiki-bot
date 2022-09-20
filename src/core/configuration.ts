import appConfig from "pwb/appconfig.json";

export interface AppConfig {
    token: string;
    logLevel: "error" | "warn" | "info" | "http" | "verbose" | "debug" | "silly";
    restrictTo?: ReadonlyArray<number>;
}

export default appConfig as AppConfig;
