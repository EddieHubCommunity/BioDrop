import { authOptions } from "../../../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { ObjectId } from "bson";
import mongoose from "mongoose";

import connectMongo from "@config/mongo";
import logger from "@config/logger";
import Profile from "@models/Profile";
import { Event } from "@models/Profile/Event";
import logChange from "@models/middlewares/logChange";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  const username = session.username;

  if (!["GET", "PUT", "DELETE"].includes(req.method)) {
    return res
      .status(400)
      .json({ error: "Invalid request: GET or PUT or DELETE required" });
  }

  const { data } = req.query;
  const context = { req, res };

  let event = {};
  if (req.method === "GET") {
    event = await getEventApi(username, data[0]);
  }
  if (req.method === "DELETE") {
    event = await deleteEventApi(context, username, data[0]);
  }
  if (req.method === "PUT") {
    if (data?.length && data[0]) {
      event = await updateEventApi(context, username, data[0], req.body);
    } else {
      event = await addEventApi(context, username, req.body);
    }
  }

  if (event.error) {
    return res.status(404).json({ message: event.error });
  }
  return res.status(200).json(event);
}

export async function getEventApi(username, id) {
  await connectMongo();
  const log = logger.child({ username });
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
    log.info(`event not found for username: ${username}`);
    return { error: "Event not found." };
  }

  return JSON.parse(JSON.stringify(getEvent[0]));
}

export async function updateEventApi(context, username, id, updateEvent) {
  await connectMongo();
  const log = logger.child({ username });

  const beforeUpdate = await getEventApi(username, id);

  let getEvent = {};

  try {
    await Event.validate(updateEvent, [
      "name",
      "description",
      "url",
      "date",
      "color",
      "tags",
    ]);
  } catch (e) {
    log.error(e, `validation failed to update event for username: ${username}`);
    return { error: e.errors };
  }

  try {
    await Profile.findOneAndUpdate(
      {
        username,
        "events._id": new ObjectId(id),
      },
      {
        $set: {
          source: "database",
          "events.$": { ...updateEvent, _id: new ObjectId(id) },
        },
      },
      { upsert: true },
    );
    getEvent = await getEventApi(username, id);
  } catch (e) {
    const error = `failed to update event for username: ${username}`;
    log.error(e, error);
    return { error };
  }

  // Add to Changelog
  try {
    logChange(await getServerSession(context.req, context.res, authOptions), {
      model: "Event",
      changesBefore: beforeUpdate,
      changesAfter: await getEventApi(username, id),
    });
  } catch (e) {
    log.error(
      e,
      `failed to record Event changes in changelog for username: ${username}`,
    );
  }

  return JSON.parse(JSON.stringify(getEvent));
}

export async function deleteEventApi(context, username, id) {
  await connectMongo();
  const log = logger.child({ username });

  const beforeDelete = await getEventApi(username, id);

  try {
    await Profile.findOneAndUpdate(
      {
        username,
      },
      {
        $set: {
          source: "database",
        },
        $pull: {
          events: {
            _id: new ObjectId(id),
          },
        },
      },
      { upsert: true, new: true },
    );
  } catch (e) {
    const error = `failed to delete event for username: ${username}`;
    log.error(e, error);
    return { error };
  }

  // Add to Changelog
  try {
    logChange(await getServerSession(context.req, context.res, authOptions), {
      model: "Event",
      changesBefore: beforeDelete,
      changesAfter: null,
    });
  } catch (e) {
    log.error(
      e,
      `failed to record Event changes in changelog for username: ${username}`,
    );
  }

  return JSON.parse(JSON.stringify({}));
}

export async function addEventApi(context, username, addEvent) {
  await connectMongo();
  const log = logger.child({ username });

  let getEvent = {};

  try {
    await Event.validate(addEvent, [
      "name",
      "description",
      "url",
      "date",
      "color",
      "tags",
    ]);
  } catch (e) {
    log.error(e, `validation failed to add event for username: ${username}`);
    return { error: e.errors };
  }

  const id = new mongoose.Types.ObjectId();

  try {
    await Profile.findOneAndUpdate(
      {
        username,
      },
      {
        $push: { events: { ...addEvent, _id: id } },
      },
      { upsert: true },
    );
    getEvent = await getEventApi(username, id);
  } catch (e) {
    const error = `failed to update event for username: ${username}`;
    log.error(e, error);
    return { error };
  }

  // Add to Changelog
  try {
    logChange(await getServerSession(context.req, context.res, authOptions), {
      model: "Event",
      changesBefore: null,
      changesAfter: getEvent,
    });
  } catch (e) {
    log.error(
      e,
      `failed to record Event changes in changelog for username: ${username}`,
    );
  }

  return JSON.parse(JSON.stringify(getEvent));
}
