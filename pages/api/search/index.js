import { searchUsers } from "../profiles";
import connectMongo from "@config/mongo";
import { getUsers } from "../profiles";
import logger from "@config/logger";

export default async function handler(req, res) {
  await connectMongo();
  const { slug } = req.query;

  if (req.method !== "GET") {
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

  const terms = cleanedSlug
    .split(",")
    .map((tag) => new RegExp(tag.trim().replace(/\s/g, ""), "i"));
  try {
    const filteredUsers = await searchUsers(terms)
    if (!filteredUsers.length) {
      return res.status(404).json({ error: `${cleanedSlug} not found` });
    }

    res.status(200).json({ users: filteredUsers });
  } catch (e) {
    logger.error(e, "ERROR fetch search users");
    res.status(500).json({ error: "Internal Server Error" });
  }
}
