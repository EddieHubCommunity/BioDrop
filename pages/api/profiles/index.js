import connectMongo from "@config/mongo";
import logger from "@config/logger";
import { Profile } from "@models/index";
import { generateAggreation } from "@config/searchConfig";

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
  try {
    const data = await Profile.aggregate(agg).exec();
    return data;
  } catch (err) {
    console.error("Error fetching search users:", err);
    throw err;
  }
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
