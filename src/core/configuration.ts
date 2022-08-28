import appConfig from "../../appconfig.json";

export interface AppConfig {
    token: string;
    logLevel: "error" | "warn" | "info" | "http" | "verbose" | "debug" | "silly";
}

export default appConfig as AppConfig;
