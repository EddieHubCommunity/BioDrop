import logger from "@config/logger";
import { serverEnv } from "@config/schemas/serverSchema";

import { updateRepoApi } from "../../pages/api/account/manage/repo/[[...data]]";

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

export async function checkGitHubRepo(username, repos) {
  const now = new Date();
  const cacheDays = 3;

  repos.map(async (repo) => {
    let updatedAt = new Date(repo.updatedAt);
    const expireOn = new Date(repo.updatedAt).setDate(
      updatedAt.getDate() + cacheDays
    );

    if (expireOn > now.getTime()) {
      logger.info(`repo not expired for username: ${username}`);
      return;
    }

    let githubData = {};
    if (expireOn < now.getTime()) {
      logger.info(`repo expired for username: ${username}`);
      githubData = await getGitHubRepo(repo.url);
      await updateRepoApi(username, repo._id, githubData);
      return;
    }
  });
}
