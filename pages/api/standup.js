import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { ObjectId } from "bson";

import connectMongo from "@config/mongo";
import logger from "@config/logger";
import Profile from "@models/Profile";
import Standup from "@models/Standup";

export default async function handler(req, res) {
  if (!["GET", "POST"].includes(req.method)) {
    return res
      .status(400)
      .json({ error: "Invalid request: GET or POST required" });
  }

  let standups = {};
  if (req.method === "GET") {
    standups = await getStandupApi();
  }
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      res.status(401).json({ message: "You must be logged in." });
      return;
    }
    const username = session.username;
    standups = await addStandupApi(username, req.body);
  }

  if (standups.error) {
    return res.status(404).json({ message: standups.error });
  }
  return res.status(200).json(standups);
}

export async function getStandupApi() {
  await connectMongo();
  const getStandups = await Standup.find({})
    .populate({
      path: "profile",
      select: "username name",
    })
    .sort({ createdAt: -1 })
    .limit(100);

  if (!getStandups) {
    logger.info("no standups found");
    return [];
  }

  return JSON.parse(JSON.stringify(getStandups));
}

export async function addStandupApi(username, standup) {
  await connectMongo();
  const log = logger.child({ username });
  let getStandup = {};

  try {
    await Standup.validate(standup, ["content"]);
  } catch (e) {
    log.error(e, `validation failed to add content for username: ${username}`);
    return { error: e.errors };
  }

  try {
    const profile = await Profile.findOne({ username });
    getStandup = await Standup.create(
      [
        {
          username,
          content: standup.content,
          profile: new ObjectId(profile._id),
        },
      ],
      { new: true }
    );
    await Profile.updateOne(
      {
        username,
      },
      {
        $inc: { standups: 1 },
      },
      { upsert: true }
    );

    log.info(`Standup created for username: ${username}`);
  } catch (e) {
    log.error(e, `failed to add Standup for username: ${username}`);
    return { error: e.errors };
  }

  return JSON.parse(JSON.stringify(getStandup));
}
