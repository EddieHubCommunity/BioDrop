import connectMongo from "@config/mongo";
import logger from "@config/logger";
import { Profile } from "@models/index";

export default async function handler(req, res) {
  if (req.method != "GET") {
    return res
      .status(400)
      .json({ error: "Invalid request: GET request required" });
  }

  const profiles = await getProfiles();

  res.status(200).json(profiles);
}
export async function getProfiles(options = {}) {
  await connectMongo();

  let profiles = [];
  const { cards } = { cards: false, ...options };
  const fields = cards
    ? ["username", "name", "bio", "tags", "-_id"]
    : ["username", "name", "bio", "tags", "location", "-_id"];
  try {
    profiles = await Profile.find(
      {
        name: { $exists: true },
        isEnabled: true,
        $or: [
          { isShadowBanned: { $exists: false } },
          { isShadowBanned: { $eq: false } },
        ],
      },
      fields
    );
  } catch (e) {
    logger.error(e, "failed loading profiles");
    return profiles;
  }

  return JSON.parse(JSON.stringify(profiles));
}

export async function getUsers(options = {}) {
  await connectMongo();

  let profiles = [];
  const { cards } = { cards: false, ...options };
  const fields = cards
    ? ["username", "name", "bio", "tags", "-_id"]
    : ["username", "name", "bio", "tags", "location", "-_id"];
  try {
    profiles = await Profile.find(
      { name: { $exists: true }, isEnabled: true },
      fields
    );
  } catch (e) {
    logger.error(e, "failed loading profiles");
    return profiles;
  }

  return JSON.parse(JSON.stringify(profiles));
}

export async function searchUsers(termsArray) {
  const agg = generateAggreation(termsArray);
  const data = await Profile.aggregate(agg).exec();
  return data;
}

export async function searchUsersIfNotUsingAtlas(termsArray) {
  let filteredUsers = [];
  const users = await getUsers();

  filteredUsers = users.flat().filter((user) => {
    const nameLower = user.name.toLowerCase();
    const usernameLower = user.username.toLowerCase();
    const userTagsString = user.tags.join(", ").toLowerCase();
    const userLocationString = user.location
      ? user.location.provided.toLowerCase()
      : "";

    const isUserMatched = termsArray.every((term) => {
      const cleanedTerm = term.trim();

      return (
        usernameLower.includes(cleanedTerm) ||
        nameLower.includes(cleanedTerm) ||
        userTagsString.includes(cleanedTerm) ||
        userLocationString.includes(cleanedTerm)
      );
    });
    return isUserMatched;
  });
  return filteredUsers
}

function getQueryString(queryArr) {
  const fields = ["name", "username", "tags", "location.name"];
  const queryStrings = queryArr.map((term) => {
    const orConditions = fields.map((field) => `${field}:${term}`).join(" OR ");
    return `(${orConditions})`;
  });

  return queryStrings.join(" AND ");
}
const defaultPath = "name"
export function generateAggreation(termsArray) {
  const query = getQueryString(termsArray);
  const agg = [
    {
      $search: {
        compound: {
          must: [
            {
              queryString: {
                query: query,
                defaultPath: defaultPath,
              },
            },
          ],
        },
      },
    },
    {
      $project: {
        name: 1,
        username: 1,
        "location.name": 1,
        tags: 1,
        score: { $meta: "searchScore" },
      },
    },
  ];
  return agg;
}
