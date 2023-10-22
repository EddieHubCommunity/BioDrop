const z = require("zod");

const envSchema = z.object({
  NEXT_PUBLIC_BASE_URL: z.string().url().default("http://localhost:3000"),
  STRIPE_PREMIUM_PRICING_ID: z.string().optional(),
  NEXT_PUBLIC_PREMIUM_SUPPORT_URL: z.string().optional(),
});

const clientEnv = envSchema.safeParse(process.env);

if (!clientEnv.success) {
  console.error("There is an error with the client environment variables");
  console.error(clientEnv.error.issues);
  process.exit?.(1);
}

console.log("The client environment variables are valid!");

module.exports = {
  clientEnv: clientEnv.data,
};
