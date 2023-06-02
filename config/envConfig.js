import * as z from "zod";

const envSchema = z.object({
  LINKFREE_MONGO_CONNECTION_STRING: z.string().min(10),
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),
  NEXT_PUBLIC_BASE_URL: z.string().url().default("http://localhost:3000"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  GITHUB_ID: z.string().optional(),
  GITHUB_SECRET: z.string().optional(),
  NEXTAUTH_SECRET: z.string().optional(),
  LINKFREE_API_SECRET: z.string().min(1),
});

export const env = envSchema.parse(process.env);

/*
    Validate the schema before running the app
*/
export const envIssues = () => {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    return result.error.issues;
  }
};
