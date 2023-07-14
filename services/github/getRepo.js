import logger from "@config/logger";
import { serverEnv } from "@config/schemas/serverSchema";

export default async function getGitHubRepo(path) {
  let repo = {};
  const ghAuth = serverEnv.GITHUB_API_TOKEN
    ? {
        headers: {
          Authorization: `bearer ${serverEnv.GITHUB_API_TOKEN}`,
        },
      }
    : {};

  try {
    const data = await fetch(`https://api.github.com/repos/${path}`, ghAuth);
    repo = await data.json();
    logger.info(`github info fetched for repo: ${path}`);
  } catch (e) {
    logger.error(`repo info from github failed for ${path}`);
    return repo;
  }

  return repo;
}
