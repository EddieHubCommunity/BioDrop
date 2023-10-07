import logger from "@config/logger";
import { serverEnv } from "@config/schemas/serverSchema";

export default async function getGitHubRepo(url) {
  const path = url.split("github.com/")[1];
  const ghAuth = serverEnv.GITHUB_API_TOKEN
    ? {
        headers: {
          Authorization: `bearer ${serverEnv.GITHUB_API_TOKEN}`,
        },
      }
    : {};

  let repo = {};
  let data = {};
  try {
    data = await fetch(`https://api.github.com/repos/${path}`, ghAuth);
    repo = await data.json();
    logger.info(`github info fetched for repo: ${path}`);
  } catch (e) {
    logger.error(e, `repo info from github failed for: ${path}`);
    throw e;
  }

  if (data.status !== 200) {
    logger.error(repo);
    return { error: repo };
  }

  return repo;
}
