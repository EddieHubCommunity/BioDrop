import { useState } from "react";
import EventCard from "@components/event/EventCard";
import Alert from "@components/Alert";
import DropdownMenu from "@components/form/DropDown";

export default function UserEvents({ manage = false, events }) {
  const [eventType, setEventType] = useState("all");

  const eventOptions = [
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

  const handleEventTypeChange = (event) => {
    setEventType(event.target.value);
  };

  const filterByEventType = (event, eventType) => {
    switch (eventType) {
      case "future":
        return event.date.future;
      case "ongoing":
        return event.date.ongoing;
      case "virtual":
        return event.date.future && event.isVirtual;
      case "inPerson":
        return event.date.future && event.isInPerson;
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
  };
  const getFilteredEvents = () => {
    if (eventType === "all") {
      return events;
    }
    return events.filter((event) => filterByEventType(event, eventType));
  };

  const eventsToShow = getFilteredEvents();

  const filteredEventOptions = eventOptions.filter((option) => {
    if (option.value === "all") {
      return true;
    }
    const filterEvents = events.filter((event) =>
      filterByEventType(event, option.value)
    );
    return filterEvents.length > 0;
  });

  return (
    <div className="m-6">
      {!manage && (
        <DropdownMenu
          eventType={eventType}
          handleEventTypeChange={handleEventTypeChange}
          options={filteredEventOptions}
          label="Select Event Type:"
          className="inline text-center text-sm font-medium leading-6 text-primary-high sm:pt-1.5"
        />
      )}

      {eventsToShow.length > 0 ? (
        <ul role="list" className="divide-y divide-primary-low mt-4">
          {eventsToShow.map((event, index) => (
            <EventCard event={event} key={index} manage={manage} />
          ))}
        </ul>
      ) : (
        <div className="mt-4">
          <Alert type="info" message="No events found" />
        </div>
      )}
    </div>
  );
}
