import { authOptions } from "../../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import connectMongo from "@config/mongo";
import logger from "@config/logger";
import Profile from "@models/Profile";
import dateFormat from "@services/utils/dateFormat";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method !== "GET") {
    return res.status(400).json({ error: "Invalid request: GET required" });
  }

  const data = await getEventsApi(session.username);

  return res.status(200).json(data);
}

export async function getEventsApi(username) {
  await connectMongo();
  const log = logger.child({ username });

  let getEvents = [];

  try {
    getEvents = await Profile.aggregate([
      {
        $match: {
          username,
        },
      },
      {
        $unwind: "$events",
      },
      {
        $replaceRoot: {
          newRoot: "$events",
        },
      },
      {
        $sort: { date: 1 },
      },
    ]);
  } catch (e) {
    log.error(e, `failed to get events for username: ${username}`);
  }
  if (getEvents.length > 0) {
    let dateEvents = [];
    const today = new Date();
    getEvents.map((event) => {
      let cleanEvent = JSON.parse(JSON.stringify(event));
      try {
        const start = new Date(event.date.start);
        const end = new Date(event.date.end);
        cleanEvent.date.startFmt = dateFormat({
          format: "long",
          date: event.date.start,
        });
        cleanEvent.date.endFmt = dateFormat({
          format: "long",
          date: event.date.end,
        });

        cleanEvent.date.cfpOpen =
          event.date.cfpClose && new Date(event.date.cfpClose) > today;
        cleanEvent.date.future = start > today;
        cleanEvent.date.ongoing = start < today && end > today;
        dateEvents.push(cleanEvent);
      } catch (e) {
        log.error(e, `ERROR event date for: "${event.name}"`);
      }
    });

    getEvents = dateEvents;
  }

  return JSON.parse(JSON.stringify(getEvents));
}
