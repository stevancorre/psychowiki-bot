import { config } from "dotenv";
import z from "zod";

config();

const envSchema = z.object({
    TOKEN: z.string().regex(/^[0-9]{8,10}:[a-zA-Z0-9_-]{35}$/gim),
    CACHE_LIFETIME: z
        .string()
        .transform(Number)
        .refine((x) => x > 0),
    LOG_LEVEL: z.enum(["error", "warn", "info", "http", "verbose", "debug", "silly"]).default("info"),
    RESTRICT_TO: z.string().transform((x) => x.split(",").map((x) => parseInt(x))),
});

export const env = envSchema.parse(process.env);
