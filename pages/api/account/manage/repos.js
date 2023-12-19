import { authOptions } from "../../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import connectMongo from "@config/mongo";
import logger from "@config/logger";
import Profile from "@models/Profile";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method !== "GET") {
    return res.status(400).json({ error: "Invalid request: GET required" });
  }

  const data = await getReposApi(session.username);

  return res.status(200).json(data);
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
        $sort: { date: 1 },
      },
    ]);
  } catch (e) {
    log.error(e, `failed to get repos for username: ${username}`);
  }

  return JSON.parse(JSON.stringify(getRepos));
}
