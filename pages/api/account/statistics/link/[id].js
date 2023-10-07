import { authOptions } from "../../../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { ObjectId } from "bson";

import connectMongo from "@config/mongo";
import logger from "@config/logger";
import { Link, LinkStats } from "@models/index";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  if (req.method != "GET") {
    return res
      .status(400)
      .json({ error: "Invalid request: GET request required" });
  }

  if (session.accountType !== "premium") {
    res.status(401).json({ message: "You must have a Premium account." });
  }

  const data = await getStatsForLink(session.username, req.query.id);
  if (data.error) {
    res.status(400).json({ error: data.error });
    return;
  }

  res.status(200).json(data);
}

export async function getStatsForLink(username, id, numberOfDays = 30) {
  await connectMongo();

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - numberOfDays);

  let link = [];
  try {
    link = await Link.findOne({ _id: new ObjectId(id), username: username });
  } catch (e) {
    const error = `failed to load link for id: ${id}`;
    logger.error(e, error);
    return { error };
  }

  let stats = [];
  try {
    stats = await LinkStats.find({ link: link._id }, "date clicks");
  } catch (e) {
    const error = `failed to load stats for link id: ${id}`;
    logger.error(e, error);
    return { error };
  }

  return JSON.parse(JSON.stringify({ url: link.url, stats }));
}
