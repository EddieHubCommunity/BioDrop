export async function getEvents() {
  let events = [];
  try {
    events = await Profile.aggregate([
      {
        $project: { username: 1, events: 1, isEnabled: 1 },
      },
      {
        $match: {
          "events.date.start": { $gt: new Date() },
          isEnabled: true,
        },
      },
      { $unwind: "$events" },
      {
        $match: { "events.date.end": { $gt: new Date() } },
      },
      {
        $sort: { "events.date.start": 1 },
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
          isEnabled: { $first: "$isEnabled" },
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
