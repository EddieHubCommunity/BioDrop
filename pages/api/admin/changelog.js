import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import { serverEnv } from "@config/schemas/serverSchema";
import logger from "@config/logger";
import connectMongo from "@config/mongo";
import { Changelog } from "@models/index";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({});
  }

  if (!["GET"].includes(req.method)) {
    return res.status(400).json({ error: "Invalid request: GET required" });
  }

  const username = session.username;

  if (!serverEnv.ADMIN_USERS.includes(username)) {
    return res.status(401).json({});
  }

  const logs = await getChangelogs();
  return res.status(200).json(logs);
}

export async function getChangelogs() {
  await connectMongo();
  let logs = [];
  try {
    logs = await Changelog.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
    ])
      .sort({ createdAt: -1 })
      .limit(50);
  } catch (e) {
    logger.error(e, "Failed to load changelogs");
    logs = [];
  }

  return JSON.parse(JSON.stringify(logs));
}
