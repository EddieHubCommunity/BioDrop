import { authOptions } from "../../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import connectMongo from "@config/mongo";
import logger from "@config/logger";
import Profile from "@models/Profile";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if(!["GET","PATCH"].includes(req.method)){
    return res.status(400).json({ error: "Invalid request: GET required" });
  }

  const username = session.username;
  let data = [];
  if(req.method === "GET"){
    data = await getReposApi(username);
  }
  if(req.method === "PATCH"){
    data = await updateReposOrderApi(username, req.body);
  }

  return res.status(200).json(data);
}

export async function updateReposOrderApi(username, data) {
  await connectMongo();
  const log = logger.child({ username });

  const repoList =  data.map(async (repo, idx) => {
    try {
      return  Profile.findOneAndUpdate(
        {
          username,
          "repos._id": repo._id,
        },
        {
          $set: {
            "repos.$.order": idx,
          },
        },
      );
    } catch (e) {
      log.error(e, `failed to update repo order for username: ${username}`);
    }
  });

  const repos = await Promise.allSettled(repoList).then(() => { 
    return getReposApi(username);
  })

  return JSON.parse(JSON.stringify(repos));
}

export async function getReposApi(username) {
  await connectMongo();
  const log = logger.child({ username });

  let getRepos = [];
  try {
    getRepos = await Profile.aggregate([
      {
        $match: {
          username,
        },
      },
      {
        $unwind: "$repos",
      },
      {
        $replaceRoot: {
          newRoot: "$repos",
        },
      },
      {
        $sort: { order: 1 },
      },
    ]);
  } catch (e) {
    log.error(e, `failed to get repos for username: ${username}`);
  }
  return JSON.parse(JSON.stringify(getRepos));
}
