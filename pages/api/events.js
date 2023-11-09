import logger from "@config/logger";
import connectMongo from "@config/mongo";
import Profile from "@models/Profile";
import dateFormat from "@services/utils/dateFormat";

export default async function handler(req, res) {
  if (req.method != "GET") {
    return res
      .status(400)
      .json({ error: "Invalid request: GET request required" });
  }

  const events = await getEvents();
  return res.status(200).json(events);
}

export async function getEvents() {
  await connectMongo();
  let events = [];
  try {
    events = await Profile.aggregate([
      {
        $match: {
          isEnabled: true,
          $or: [
            { isShadowBanned: { $exists: false } },
            { isShadowBanned: { $eq: false } },
          ],
        },
      },
      { $project: { username: 1, events: 1 } },
      { $match: { "events.date.start": { $gt: new Date() } } },
      { $unwind: "$events" },
      {
        $match: {
          "events.date.end": { $gt: new Date() },
          "events.isEnabled": { $ne: false },
        },
      },
      {
        $group: {
          _id: "$events.url",
          usernames: { $addToSet: "$username" },
          isVirtual: { $first: "$events.isVirtual" },
          color: { $first: "$events.color" },
          date: { $first: "$events.date" },
          url: { $first: "$events.url" },
          name: { $first: "$events.name" },
          description: { $first: "$events.description" },
          price: { $first: "$events.price" },
          isEnabled: { $first: "$isEnabled" },
          tags: { $first: "$events.tags" },
        },
      },
      {
        $sort: { "date.start": 1 },
      },
    ]).exec();

    let dateEvents = [];
    const today = new Date();
    for (const event of events) {
      let cleanEvent = structuredClone(event);
      try {
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

        dateEvents.push(cleanEvent);
      } catch (e) {
        logger.error(e, `ERROR event date for: "${event.name}"`);
      }
    }

    events = dateEvents;
  } catch (e) {
    logger.error(e, "Failed to load events");
    events = [];
  }

  return JSON.parse(JSON.stringify(events));
}
