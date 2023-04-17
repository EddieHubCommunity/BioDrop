import { useState } from "react";
import EventCard from "@components/event/EventCard";
import Alert from "@components/Alert";
import DropdownMenu from "@components/form/DropDown";

export default function UserEvents({ data }) {
  const [eventType, setEventType] = useState("all");

  const eventOptions = [
    { value: 'all' , name: 'All Events'},
    { value: 'future' , name: 'Future Events'},
    { value: 'ongoing', name: 'Ongoing Events'},
    { value: 'virtual', name: 'Virtual Events'},
    { value: 'inPerson', name: 'In-Person Events'},
    { value: 'cfpOpen', name:'Events with open CFP'},
    { value: 'past', name: 'Past Events'}
  ];

  const handleEventTypeChange = (event) => {
    setEventType(event.target.value);
  };

  const filterByEventType = (event, eventType) => {
    const startDate = new Date(event.date.start);
    const endDate = new Date(event.date.end);
    const now = new Date();
    switch (eventType) {
      case "future":
        return startDate > now;
      case "ongoing":
        return startDate <= now && now <= endDate;
      case "virtual":
        return startDate > now && event.isVirtual;
      case "inPerson":
        return startDate > now && event.isInPerson;
      case "cfpOpen":
        return startDate > now && event.date.cfpClose > now;
      case "past":
        return endDate < now;
      default:
        return true;
    }
  };

  const getFilteredEvents = () => {
    if (eventType === "all") {
      return data.events;
    }
    return data.events.filter((event) => filterByEventType(event, eventType));
  };

  const eventsToShow = getFilteredEvents();

  return (
    <div className="m-6">
      <DropdownMenu

      eventType={eventType}
      handleEventTypeChange={handleEventTypeChange} 
      options={eventOptions} 
      label="Select Event Type:"
      className="inline text-center text-sm font-medium leading-6 text-gray-900 sm:pt-1.5" 
      
      />

      {eventsToShow.length > 0 ? (
        <ul role="list" className="divide-y divide-primary-low mt-4">
          {eventsToShow.map((event, index) => (
            <EventCard event={event} key={index} />
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
