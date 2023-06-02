import * as z from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),
  NEXT_PUBLIC_BASE_URL: z.string().url().default("http://localhost:3000"),
});

export const clientEnv = envSchema.parse(process.env);
