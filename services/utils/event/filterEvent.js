export function filterByEventType(event, eventType) {
  switch (eventType) {
    case "future":
      return event.date.future;
    case "ongoing":
      return event.date.ongoing;
    case "virtual":
      return (event.date.future && event.isVirtual) || event.isVirtual;
    case "inPerson":
      return (event.date.future && event.isInPerson) || event.isInPerson;
    case "cfpOpen":
      return event.date.cfpOpen;
    case "free":
      return event.price?.startingFrom === 0;
    case "paid":
      return event.price?.startingFrom > 0;
    case "past":
      return !event.date.future;
    default:
      return true;
  }
}

export function getFilteredEvents(events, eventType) {
  if (eventType === "all") {
    return events;
  }
  let filteredEvents = events.filter((event) =>
    filterByEventType(event, eventType),
  );
  if (eventType === "future" && filteredEvents.length === 0) {
    filteredEvents = events.filter((event) =>
      filterByEventType(event, eventType),
    );
  }
  return filteredEvents;
}
