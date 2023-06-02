import * as z from "zod";

const envSchema = z.object({
  LINKFREE_MONGO_CONNECTION_STRING: z.string().min(10),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  GITHUB_ID: z.string().optional(),
  GITHUB_SECRET: z.string().optional(),
  NEXTAUTH_SECRET: z.string().optional(),
  LINKFREE_API_SECRET: z.string().min(1),
});

export const serverEnv = envSchema.parse(process.env);
