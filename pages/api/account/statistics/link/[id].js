import { authOptions } from "../../../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

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

  const data = await getStatsForLink(session.username, id);

  res.status(200).json(data);
}

export async function getStatsForLink(username, id, numberOfDays = 30) {
  await connectMongo();

  // This calculates the start date by subtracting the specified number of days from the current date.
  // The query then retrieves data from that calculated start date up to the current date.
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - numberOfDays);

  let link = [];
  try {
    link = Link.find({ _id: id, username: username });
  } catch (e) {
    logger.error(e, `failed to load link for id: ${id}`);
  }

  let stats = [];
  try {
    stats = LinkStats.find({ link: id, date: { $gte: startDate } });
  } catch (e) {
    logger.error(e, "failed to load stats for link");
  }

  return JSON.parse(JSON.stringify(data));
}
