import logger from "@config/logger";
import Profile from "@models/Profile";

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
  let events = [];
  try {
    events = await Profile.aggregate([
      { $project: { username: 1, events: 1, isEnabled: 1 } },
      { $match: { "events.date.start": { $gt: new Date() } } },
      { $match: { isEnabled: true } },
    ])
      .unwind("events")
      .sort({ "events.date.start": 1 })
      .exec();

    events = events
      .map((event) => ({
        ...event.events,
        username: event.username,
        _id: event._id,
      }))
      // TODO remove and do with mongo query
      .filter((event) => new Date(event.date.end) > new Date());
  } catch (e) {
    logger.error(e, "Failed to load events");
    events = [];
  }

  return JSON.parse(JSON.stringify(events));
}
