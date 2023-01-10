import { useState } from "react";

import EventCard from "../event/EventCard";
import Alert from "../Alert";
import EventKey from "../event/EventKey";

export default function UserEvents({ data }) {
  const [eventType, seteventType] = useState("all");
  let categorisedEvents = {
    all: data.events,
    virtual: data.events.filter((event) => event.isVirtual === true),
    inPerson: data.events.filter((event) => event.isInPerson === true),
    cfpOpen: data.events.filter((event) =>
      event.date.cfpClose ? new Date(event.date.cfpClose) > new Date() : false
    ),
  };

  return (
    <div className="mt-6">
      <EventKey
        categorisedEvents={categorisedEvents}
        onToggleEventType={(newValue) => seteventType(newValue)}
      />

      {!data.events && <Alert type="info" message="No events found" />}
      <ul role="list" className="divide-y divide-gray-200">
        {data.events &&
          categorisedEvents[eventType].map((event, index) => (
            <EventCard event={event} key={index} />
          ))}
      </ul>
    </div>
  );
}
