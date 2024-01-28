import { useEffect, useState } from "react";
import EventCard from "@components/event/EventCard";
import Alert from "@components/Alert";
import Select from "@components/form/Select";
import {
  filterByEventType,
  getFilteredEvents,
} from "@services/utils/event/filterEvent";

const allEventOptions = [
  { value: "", name: "options" },
  { value: "all", name: "All Events" },
  { value: "future", name: "Future Events" },
  { value: "ongoing", name: "Ongoing Events" },
  { value: "virtual", name: "Virtual Events" },
  { value: "inPerson", name: "In-Person Events" },
  { value: "cfpOpen", name: "Events with open CFP" },
  { value: "free", name: "Free Events" },
  { value: "paid", name: "Paid Events" },
  { value: "past", name: "Past Events" },
];

export default function UserEvents({
  manage = false,
  events,
  filter = "future",
}) {
  const [eventType, setEventType] = useState(filter);
  const [eventsToShow, setEventsToShow] = useState([]);
  const [eventOptions, setEventOptions] = useState([]);

  useEffect(() => {
    setEventsToShow(getFilteredEvents(events, "future"));
    const filteredEventOptions = allEventOptions.filter((option) => {
      if (option.value === "all") {
        return true;
      }
      const filterEvents = events.filter((event) =>
        filterByEventType(event, option.value),
      );
      return filterEvents.length > 0;
    });
    setEventOptions(filteredEventOptions);
  }, [events]);

  const handleEventTypeChange = (event) => {
    setEventType(event.target.value);
    setEventsToShow(getFilteredEvents(events, event.target.value));
  };

  return (
    <>
      {eventsToShow.length === 0 && (
        <Alert type="info" message="No Events found" />
      )}

      {events.length > 0 && (
        <Select
          name="event-type"
          value={eventType}
          label="Select an event type"
          onChange={handleEventTypeChange}
          options={eventOptions.map((option) => ({
            label: option.name,
            value: option.value,
          }))}
          className="inline text-center text-sm font-medium leading-6 text-primary-high sm:pt-1.5"
        />
      )}

      {eventsToShow.length > 0 && (
        <ul role="list" className="mt-4">
          {eventsToShow.map((event, index) => (
            <EventCard event={event} key={index} manage={manage} />
          ))}
        </ul>
      )}
    </>
  );
}
