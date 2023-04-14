import { useState } from "react";

import EventCard from "@components/event/EventCard";
import Alert from "@components/Alert";
import EventKey from "@components/event/EventKey";

export default function UserEvents({ data }) {
  const [eventType, setEventType] = useState("all");
  const futureEvents = data.events.filter(
    (event) => new Date(event.date.start) > new Date()
  );

  let categorisedEvents = {
    all: data.events,
    future: futureEvents,
    ongoing: data.events.filter(
      (event) =>
        new Date(event.date.start) < new Date() &&
        new Date(event.date.end) > new Date()
    ),
    virtual: futureEvents.filter((event) => event.isVirtual === true),
    inPerson: futureEvents.filter((event) => event.isInPerson === true),
    cfpOpen: futureEvents.filter((event) =>
      event.date.cfpClose ? new Date(event.date.cfpClose) > new Date() : false
    ),
    past: data.events
      .filter((event) => new Date(event.date.end) < new Date())
      .sort((a, b) => new Date(b.date.start) - new Date(a.date.start)),
  };

  const handleEventTypeChange = (event) => {
    setEventType(event.target.value);
  };

  return (
    <div className="mt-6">
      <label
        htmlFor="event-type-select"
        className=" mr-2 font-semibold text-gray-700"
      >
        Select Event Type:
      </label>
      <select
        id="event-type-select"
        value={eventType}
        onChange={handleEventTypeChange}
        className="block w-full max-w-lg px-4 py-2 border border-orange-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
      >
        <option value="all">All Events</option>
        <option value="future">Future Events</option>
        <option value="ongoing">Ongoing Events</option>
        <option value="virtual">Virtual Events</option>
        <option value="inPerson">In-Person Events</option>
        <option value="cfpOpen">Events with Open CFP</option>
        <option value="past">Past Events</option>
      </select>

      {!data.events && <Alert type="info" message="No events found" />}
      <ul role="list" className="divide-y divide-primary-low mt-4">
        {data.events &&
          categorisedEvents[eventType].map((event, index) => (
            <EventCard event={event} key={index} />
          ))}
      </ul>
    </div>
  );
}
