import logger from "@config/logger";
import connectMongo from "@config/mongo";
import Profile from "@models/Profile";

export default async function handler(req, res) {
  if (req.method != "GET") {
    return res
      .status(400)
      .json({ error: "Invalid request: GET request required" });
  }

  const repos = await getRepos(req.query.sortBy);
  return res.status(200).json(repos);
}

export async function getRepos(sortBy) {
  const sortOptions = {
    "created-date": "dates.createdAt",
    "pushed-date": "dates.pushedAt",
    stars: "stats.stars",
    forks: "stats.forks",
    favourites: "count",
  };
  await connectMongo();
  let repos = [];
  let dateOneMonthAgo = new Date();
  dateOneMonthAgo.setMonth(dateOneMonthAgo.getMonth() - 1); //1 month ago
  try {
    repos = await Profile.aggregate([
      {
        $match: {
          isEnabled: true,
          $or: [
            { isShadowBanned: { $exists: false } },
            { isShadowBanned: { $eq: false } },
          ],
        },
      },
      { $project: { username: 1, repos: 1, isEnabled: 1 } },
      { $unwind: "$repos" },
      {
        $match: {
          $and: [
            { "repos.dates.pushedAt": { $gt: dateOneMonthAgo } },
            { "repos.stats.forks": { $gte: 10 } },
            { "repos.stats.stars": { $gte: 100 } },
          ],
        },
      },
      {
        $group: {
          _id: "$repos.url",
          usernames: { $addToSet: "$username" },
          url: { $first: "$repos.url" },
          name: { $first: "$repos.name" },
          fullname: { $first: "$repos.fullname" },
          owner: { $first: "$repos.owner" },
          description: { $first: "$repos.description" },
          stats: { $first: "$repos.stats" },
          topics: { $first: "$repos.topics" },
          dates: { $first: "$repos.dates" },
          updatedAt: { $first: "$repos.updatedAt" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { [sortOptions[sortBy]]: -1 },
      },
    ]).exec();
  } catch (e) {
    logger.error(e, "Failed to load repos");
    repos = [];
  }

  return JSON.parse(JSON.stringify(repos));
}
