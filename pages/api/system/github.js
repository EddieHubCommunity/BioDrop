import connectMongo from "@config/mongo";
import logger from "@config/logger";
import getGitHubRepo from "@services/github/getRepo";
import { updateRepoApi } from "../account/manage/repo/[[...data]]";
import { Profile } from "@models/index";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(400).json({ error: "Get requests only" });
  }
  await connectMongo();

  const now = new Date();
  const cacheDays = 3;
  logger.info(
    `fetch all repos that data is older than ${cacheDays} days and update`,
  );

  let repos = [];
  try {
    repos = await Profile.aggregate([
      {
        $match: {
          isEnabled: true,
        },
      },
      { $project: { username: 1, repos: 1 } },
      {
        $unwind: "$repos",
      },
      {
        $match: {
          "repos.updatedAt": {
            $lt: new Date(now.setDate(now.getDate() - cacheDays)),
          },
        },
      },
    ]);
  } catch (e) {
    logger.error(e, `failed to get expired repos`);
  }

  repos.map(async (user) => {
    let githubData = {};

    logger.info(`repo "${user.repos.url}" expired for "${user.username}"`);
    try {
      githubData = await getGitHubRepo(user.repos.url);
    } catch (e) {
      logger.error(
        e,
        `failed to get github data for user: "${user.username}" and repo: "${user.repos.url}"`,
      );
      return;
    }

    try {
      await updateRepoApi(user.username, user.repos._id, githubData);
    } catch (e) {
      logger.error(
        e,
        `failed to save github data for user: "${user.username}" and repo: "${user.repos.url}"`,
      );
    }
  });

  return res.status(200).json({
    repos: repos.length,
  });
}
