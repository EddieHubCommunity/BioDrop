require("dotenv").config();

const requiredEnvVariables = [
  "LINKFREE_MONGO_CONNECTION_STRING",
  "NEXT_PUBLIC_BASE_URL",
  "NODE_ENV",
  "GITHUB_ID",
  "GITHUB_SECRET",
  "NEXTAUTH_SECRET",
  "NEXTAUTH_URL",
  "LINKFREE_API_SECRET",
];

const missingRequiredEnvVariables = [];

for (const variableName of requiredEnvVariables) {
  if (!process.env[variableName]) {
    missingRequiredEnvVariables.push(variableName);
  }
}

if (missingRequiredEnvVariables.length > 0) {
  throw new Error(
    `Missing required environment variables "${missingRequiredEnvVariables}". Visit https://linkfree.io/docs/environments/environment-variables for more info.`
  );
}
