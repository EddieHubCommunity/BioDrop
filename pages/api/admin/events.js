import logger from "@config/logger";
import Profile from "@models/Profile";
import connectMongo from "@config/mongo";

export default async function handler(req, res) {
  if (!["GET"].includes(req.method)) {
    return res.status(400).json({ error: "Invalid request: GET required" });
  }

  const events = await getEvents();
  return res.status(200).json(events);
}

export async function getEvents() {
  await connectMongo();
  let events = [];
  try {
    events = await Profile.aggregate([
      { $project: { username: 1, events: 1, isEnabled: 1, isShadowBanned: 1 } },
      { $unwind: "$events" },
      {
        $match: {
          "events.date.start": { $gt: new Date() },
          "events.date.end": { $gt: new Date() },
        },
      },
      {
        $sort: { "events.date.start": 1 },
      },
    ]).exec();
  } catch (e) {
    logger.error(e, "Failed to load events");
    events = [];
  }
  events = events.map((event) => ({
    ...event.events,
    username: event.username,
    isShadowBanned: event.isShadowBanned,
  }));

  return JSON.parse(JSON.stringify(events));
}
