import { useState } from "react";

import EventCard from "@components/event/EventCard";
import Alert from "@components/Alert";
import EventKey from "@components/event/EventKey";

export default function UserEvents({ data }) {
  const [eventType, setEventType] = useState("future");
  const futureEvents = data.events.filter((event) => event.date.future);

  let categorizedEvents = {
    future: futureEvents,
    ongoing: data.events.filter((event) => event.date.ongoing === true),
    virtual: futureEvents.filter((event) => event.isVirtual === true),
    inPerson: futureEvents.filter((event) => event.isInPerson === true),
    cfpOpen: futureEvents.filter((event) => event.date.cfpOpen === true),
    free: data.events.filter((event) => event.price?.startingFrom === 0),
    paid: data.events.filter((event) => event.price?.startingFrom > 0),
    past: data.events.filter((event) => event.date.future === false),
  };

  return (
    <div className="mt-6">
      <EventKey
        categorizedEvents={categorizedEvents}
        onToggleEventType={(newValue) => setEventType(newValue)}
      />

      {!data.events && <Alert type="info" message="No events found" />}
      <ul role="list" className="divide-y divide-primary-low">
        {data.events &&
          categorizedEvents[eventType].map((event, index) => (
            <EventCard event={event} key={index} />
          ))}
      </ul>
    </div>
  );
}
