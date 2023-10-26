import { ObjectId } from "bson";

import connectMongo from "@config/mongo";
import logger from "@config/logger";
import Profile from "@models/Profile";

export default async function handler(req, res) {
  if (!["PATCH"].includes(req.method)) {
    return res.status(400).json({ error: "Invalid request: PATCH required" });
  }

  let event = {};
  if (req.method === "PATCH") {
    event = await updateEventApi(req.query.id[0], req.body);
  }

  if (event.error) {
    return res.status(404).json({ message: event.error });
  }
  return res.status(200).json(event);
}

export async function updateEventApi(id, data) {
  await connectMongo();

  let event = {};
  try {
    event = await Profile.findOneAndUpdate(
      {
        username: data.username,
        "events._id": new ObjectId(id),
      },
      {
        $set: {
          "events.$.isEnabled": data.isEnabled,
        },
      },
    );
  } catch (e) {
    logger.error(e, `failed to update event for event: ${id} by admin`);
    return { error: "Event not updated" };
  }

  try {
    event = await getEventApi(id, data.username);
  } catch (e) {
    logger.error(e, `failed to get event for event: ${id} by admin`);
    return { error: "Event not retrieved" };
  }

  return JSON.parse(JSON.stringify(event));
}

export async function getEventApi(id, username) {
  await connectMongo();
  const getEvent = await Profile.aggregate([
    {
      $match: {
        username,
      },
    },
    {
      $unwind: "$events",
    },
    {
      $match: {
        "events._id": new ObjectId(id),
      },
    },
    {
      $replaceRoot: {
        newRoot: "$events",
      },
    },
  ]);

  if (!getEvent) {
    logger.info(`event not found for username: ${username} by admin`);
    return { error: "Event not found." };
  }

  return JSON.parse(JSON.stringify({ ...getEvent[0], username }));
}
