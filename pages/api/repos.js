import logger from "@config/logger";
import connectMongo from "@config/mongo";
import Profile from "@models/Profile";

export default async function handler(req, res) {
  if (req.method != "GET") {
    return res
      .status(400)
      .json({ error: "Invalid request: GET request required" });
  }

  const repos = await getRepos();
  return res.status(200).json(repos);
}

export async function getRepos() {
  await connectMongo();
  let repos = [];
  let dateOneMonthAgo = new Date();
  dateOneMonthAgo.setMonth(dateOneMonthAgo.getMonth() - 1); //1 month ago
  try {
    repos = await Profile.aggregate([
      { $project: { username: 1, repos: 1, isEnabled: 1 } },
      { $match: { isEnabled: true } },
      { $unwind: "$repos" },
      { $match: {"repos.dates.pushedAt": {$gt: dateOneMonthAgo } } },
      {
        $sort: { "repos.dates.pushedAt": -1 },
      },
      {
        $replaceRoot: {
          newRoot: "$repos",
        },
      },
    ]).exec();
  } catch (e) {
    logger.error(e, "Failed to load repos");
    repos = [];
  }

  return JSON.parse(JSON.stringify(repos));
}
