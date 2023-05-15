import z from "zod";

const DEVELOPMENT_ENV = "development";
const PRODUCTION_ENV = "production";

// Validate NODE_ENV
const nodeEnvSchema = z.enum([DEVELOPMENT_ENV, PRODUCTION_ENV])
                        .nonempty()
                        .default(DEVELOPMENT_ENV)
NODE_ENV = nodeEnvSchema.parse(process.env.NODE_ENV)
// Define a schema that validates the envirnment variables
let envSchema = z.object({
  // Mongo DB instance URI
  LINKFREE_MONGO_CONNECTION_STRING: z.string().nonempty(),
  // Next App configuration
  NEXT_PUBLIC_BASE_URL: z.string().nonempty(),
});

// If there are any variables which are specifically needed on the production environment,
// add them to the schema before validating
if (NODE_ENV === PRODUCTION_ENV) {
  envSchema = envSchema.merge(
    z.object({
      // NextAuth credentials
      NEXTAUTH_URL: z.string().trim().url().nonempty(),
      NEXTAUTH_SECRET: z.string().nonempty(),
      // Next App configuration
      NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string(),
    })
  );
}

export default envSchema.parse(process.env);
