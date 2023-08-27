import { authOptions } from "../../../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { ObjectId } from "bson";
import mongoose from "mongoose";

import connectMongo from "@config/mongo";
import logger from "@config/logger";
import Profile from "@models/Profile";
import { Repo } from "@models/Profile/Repo";
import getGitHubRepo from "@services/github/getRepo";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json([]);
    return;
  }

  if (!["GET", "POST", "DELETE"].includes(req.method)) {
    return res.status(400).json({ error: "Invalid request: GET required" });
  }

  const username = session.username;
  const { data } = req.query;
  let repo = {};
  if (req.method === "GET") {
    repo = await getRepoApi(username, data[0]);
  }
  if (req.method === "POST") {
    repo = await addRepoApi(username, req.body);
  }
  if (req.method === "DELETE") {
    repo = await deleteRepoApi(username, data[0]);
  }

  if (repo.error) {
    return res.status(404).json({ message: repo.error });
  }
  return res.status(200).json(repo);
}

export async function getRepoApi(username, id) {
  await connectMongo();
  const log = logger.child({ username });
  const getRepo = await Profile.aggregate([
    {
      $match: {
        username,
      },
    },
    {
      $unwind: "$repos",
    },
    {
      $match: {
        "repos._id": new ObjectId(id),
      },
    },
    {
      $replaceRoot: {
        newRoot: "$repos",
      },
    },
  ]);

  if (!getRepo) {
    log.info(`repo not found for username: ${username}`);
    return { error: "Repo not found." };
  }

  return JSON.parse(JSON.stringify(getRepo[0]));
}

export async function addRepoApi(username, addRepo) {
  await connectMongo();
  const log = logger.child({ username });
  let getRepo = {};

  try {
    await Repo.validate(addRepo, ["url"]);
  } catch (e) {
    log.error(e, `validation failed to add repo for username: ${username}`);
    return { error: e.errors };
  }

  const repoUrl = addRepo.url.endsWith("/") ? addRepo.url.slice(0, -1) : addRepo.url;

  const profile = await Profile.findOne({ username });
  if (profile.repos?.find((repo) => repo.url === repoUrl)) {
    const error = `repo already exists for: ${repoUrl}`;
    log.error(error);
    return { error };
  }

  let githubData = {};
  try {
    githubData = await getGitHubRepo(repoUrl);
  } catch (e) {
    const error = `failed to get data for repo: ${repoUrl}`;
    log.error(e, error);
    return { error };
  }

  if (githubData.error) {
    return { error: githubData.error.message };
  }

  const id = new mongoose.Types.ObjectId();

  try {
    await Profile.findOneAndUpdate(
      {
        username,
      },
      {
        $set: {
          source: "database",
        },
        $push: {
          repos: {
            _id: id,
            url: repoUrl,
            fullname: githubData.name,
            name: githubData.name,
            owner: githubData.owner.login,
            description: githubData.description,
            topics: githubData.topics,
            stats: {
              issues: githubData.open_issues_count,
              stars: githubData.stargazers_count,
              forks: githubData.forks_count,
              watchers: githubData.watchers_count,
              subscribers: githubData.subscribers_count,
            },
            dates: {
              createdAt: githubData.created_at,
              updatedAt: githubData.updated_at,
              pushedAt: githubData.pushed_at,
            },
            updatedAt: new Date(),
          },
        },
      },
      { new: true }
    );
    getRepo = await getRepoApi(username, id);
  } catch (e) {
    const error = `failed to add repo for username: ${username}`;
    log.error(e, error);
    return { error };
  }

  return JSON.parse(JSON.stringify(getRepo));
}

export async function deleteRepoApi(username, id) {
  await connectMongo();
  const log = logger.child({ username });

  try {
    await Profile.findOneAndUpdate(
      {
        username,
      },
      {
        $set: {
          source: "database",
        },
        $pull: {
          repos: {
            _id: new ObjectId(id),
          },
        },
      },
      { new: true }
    );
  } catch (e) {
    const error = `failed to delete repo for username: ${username}`;
    log.error(e, error);
    return { error };
  }

  return JSON.parse(JSON.stringify({}));
}

export async function updateRepoApi(username, id, githubData) {
  await connectMongo();
  const log = logger.child({ username });

  let getRepo = {};
  try {
    await Profile.findOneAndUpdate(
      {
        username,
        "repos._id": new ObjectId(id),
      },
      {
        $set: {
          source: "database",
          "repos.$": {
            url: githubData.html_url,
            fullname: githubData.name,
            name: githubData.name,
            owner: githubData.owner.login,
            description: githubData.description,
            topics: githubData.topics,
            stats: {
              issues: githubData.open_issues_count,
              stars: githubData.stargazers_count,
              forks: githubData.forks_count,
              watchers: githubData.watchers_count,
              subscribers: githubData.subscribers_count,
            },
            dates: {
              createdAt: githubData.created_at,
              updatedAt: githubData.updated_at,
              pushedAt: githubData.pushed_at,
            },
            updatedAt: new Date(),
          },
        },
      },
      { new: true }
    );
    getRepo = await getRepoApi(username, id);
  } catch (e) {
    const error = `failed to add repo for username: ${username}`;
    log.error(e, error);
    return { error };
  }

  return JSON.parse(JSON.stringify(getRepo));
}
