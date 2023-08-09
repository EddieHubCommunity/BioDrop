import connectMongo from "@config/mongo";
import { getProfiles } from "../profiles";
import logger from "@config/logger";

export default async function handler(req, res) {
  await connectMongo();
  const { slug } = req.query;

  if (req.method != "GET") {
    return res
      .status(400)
      .json({ error: "Invalid request: GET request required" });
  }

  if (!slug) {
    return res
      .status(400)
      .json({ error: "Invalid request: search input is required" });
  }

  const cleanedSlug = slug
    .trim()
    .replace(/\s{2,}/g, " ")
    .toLowerCase();
  const terms = cleanedSlug.split(",");
  let filteredUsers = [];

  try {
    const users = await getProfiles();

    filteredUsers = users.flat().filter((user) => {
      const nameLower = user.name.toLowerCase();
      const usernameLower = user.username.toLowerCase();
      const userTagsString = user.tags.join(", ").toLowerCase();
      const userLocationString = user.location
        ? user.location.provided.toLowerCase()
        : "";

      const isUserMatched = terms.every((term) => {
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

    if (!filteredUsers.length) {
      return res.status(404).json({ error: `${cleanedSlug} not found` });
    }

    res.status(200).json({ users: filteredUsers });
  } catch (e) {
    logger.error(e, "ERROR fetch search users");
  }
}
