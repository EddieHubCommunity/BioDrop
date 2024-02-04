const z = require("zod");
require("dotenv").config();

const envSchema = z.object({
  BIODROP_MONGO_CONNECTION_STRING: z.string().min(10),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  GITHUB_ID: z.string().optional(),
  GITHUB_SECRET: z.string().optional(),
  NEXTAUTH_SECRET: z.string().optional(),
  BIODROP_API_SECRET: z.string().min(4),
  GITHUB_API_TOKEN: z.string().optional(),
  RANDOM_USERS: z.string().optional(),
  ADMIN_USERS: z.string().optional(),
  NEXT_PUBLIC_VERCEL_ENV: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  VERCEL_PROJECT_ID: z.string().optional(),
  VERCEL_TEAM_ID: z.string().optional(),
  VERCEL_AUTH_TOKEN: z.string().optional(),
});

const serverEnv = envSchema.safeParse(process.env);

if (!serverEnv.success) {
  console.error("There is an error with the server environment variables");
  console.error(serverEnv.error.issues);
  process.exit?.(1);
}

console.log("The server environment variables are valid!");

serverEnv.data.ADMIN_USERS = serverEnv.data.ADMIN_USERS?.split(",") || [];

module.exports = {
  serverEnv: serverEnv.data,
};
