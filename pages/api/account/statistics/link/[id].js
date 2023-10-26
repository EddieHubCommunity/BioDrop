import { authOptions } from "../../../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { ObjectId } from "bson";

import connectMongo from "@config/mongo";
import logger from "@config/logger";
import { Link, LinkStats } from "@models/index";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

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

  let results = [];
  try {
    results = await LinkStats.find(
      { link: link._id, date: { $gte: startDate } },
      "date clicks -_id",
    ).sort({ date: "asc" });
  } catch (e) {
    const error = `failed to load stats for link id: ${id}`;
    logger.error(e, error);
    return { error };
  }

  let stats = [];
  for (let day = 0; day < numberOfDays; day++) {
    const date = new Date();
    date.setDate(date.getDate() - numberOfDays + day);
    const result = results.find(
      (result) => result.date.toDateString() === date.toDateString(),
    );
    stats.push(result ? result : { date, clicks: 0 });
  }

  return JSON.parse(
    JSON.stringify({ url: link.url, total: link.clicks, stats }),
  );
}
