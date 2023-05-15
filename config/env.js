import { z } from "zod";
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config()

const DEVELOPMENT_ENV = "development";
const PRODUCTION_ENV = "production";

// Define a schema that validates the envirnment variables
let envSchema = z.object({
  // PORT
  PORT: z.number().default(3000),
  // Validate NODE_ENV
  NODE_ENV: z.enum([DEVELOPMENT_ENV, PRODUCTION_ENV])
              .default(DEVELOPMENT_ENV),
  // Mongo DB instance URI
  LINKFREE_MONGO_CONNECTION_STRING: z.string().nonempty(),
  // Next App configuration
  NEXT_PUBLIC_BASE_URL: z.string().trim().url().nonempty(),
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string(),
  // NextAuth credentials
  NEXTAUTH_URL: z.string().trim().url().optional(),
  NEXTAUTH_SECRET: z.string().optional(),
  // Github Credentials
  GITHUB_ID: z.string().optional(),
  GITHUB_SECRET: z.string().optional(),
  // CI
  CI: z.string().optional(),
  // testinmonial.mjs
  FILE_NAME: z.string().optional(),
  DATA_TITLE: z.string().optional(),
  DATA_DESCRIPTION: z.string().optional(),
  DATA_DATE: z.string().optional(),
  // check-filenames.js
  FILENAMES: z.string().optional(),
  BASE_FILENAMES: z.string().optional(),
  USERNAME: z.string().optional(),
})

// Parse the environment variables and validate against the schema
const env = envSchema.parse(process.env);

export default env;
