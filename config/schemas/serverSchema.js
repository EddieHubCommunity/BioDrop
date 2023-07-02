const z = require("zod");
require("dotenv").config();

const envSchema = z.object({
  LINKFREE_MONGO_CONNECTION_STRING: z.string().min(10),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  GITHUB_ID: z.string().optional(),
  GITHUB_SECRET: z.string().optional(),
  NEXTAUTH_SECRET: z.string().optional(),
  LINKFREE_API_SECRET: z.string().min(4),
  GITHUB_API_TOKEN: z.string().optional(),
  RANDOM_USERS: z.string().optional(),
});

const serverEnv = envSchema.safeParse(process.env);

if (!serverEnv.success) {
  console.error("There is an error with the server environment variables");
  console.error(serverEnv.error.issues);
  process.exit?.(1);
}

console.log("The server environment variables are valid!");

module.exports = {
  serverEnv: serverEnv.data,
};
