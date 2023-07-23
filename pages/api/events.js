import logger from "@config/logger";
import Profile from "@models/Profile";

export default async function handler(req, res) {
  if (req.method != "GET") {
    return res
      .status(400)
      .json({ error: "Invalid request: GET request required" });
  }

  const { withLocation } = req.query;

  const events = await getEvents(withLocation);
  return res.status(200).json(events);
}

export async function getEvents(withLocation = false) {
  let events = [];
  let aggregate = [
    { $project: { username: 1, events: 1, isEnabled: 1 } },
    { $match: { "events.date.start": { $gt: new Date() }, isEnabled: true } },
    { $unwind: "$events" },
    { $match: { "events.date.end": { $gt: new Date() } } },
  ];

  if (withLocation) {
    aggregate.push({
      $match: {
        $and: [
          { "events.location": { $exists: true } },
          { "events.location.lat": { $exists: true } },
          { "events.location.lon": { $exists: true } },
          { "events.location.lat": { $ne: null } },
          { "events.location.lon": { $ne: null } },
        ],
      },
    });
  }

  aggregate.push(
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
        location: { $mergeObjects: "$events.location" },
        isEnabled: { $first: "$isEnabled" },
      },
    },
    { $sort: { "date.start": 1 } }
  );

  try {
    events = await Profile.aggregate(aggregate).exec();
    let dateEvents = [];
    const today = new Date();
    for (const event of events) {
      let cleanEvent = structuredClone(event);
      const dateTimeStyle = {
        dateStyle: "full",
        timeStyle: "long",
      };
      try {
        cleanEvent.date.startFmt = new Intl.DateTimeFormat(
          "en-GB",
          dateTimeStyle
        ).format(new Date(event.date.start));
        cleanEvent.date.endFmt = new Intl.DateTimeFormat(
          "en-GB",
          dateTimeStyle
        ).format(new Date(event.date.end));

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
