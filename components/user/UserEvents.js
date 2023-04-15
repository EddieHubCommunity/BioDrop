import { useState } from "react";
import EventCard from "@components/event/EventCard";
import Alert from "@components/Alert";

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
  ]

  const handleEventTypeChange = (event) => {
    setEventType(event.target.value);
  };

  const eventsToShow = eventType === "all"
    ? data.events
    : data.events.filter(event => {
        const startDate = new Date(event.date.start);
        const endDate = new Date(event.date.end);
        const now = new Date();
        return eventType === "future" && startDate > now
          || eventType === "ongoing" && startDate <= now && now <= endDate
          || eventType === "virtual" && startDate > now && event.isVirtual
          || eventType === "inPerson" && startDate > now && event.isInPerson
          || eventType === "cfpOpen" && startDate > now && event.date.cfpClose > now
          || eventType === "past" && endDate < now;
      });

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
        {eventOptions.map(option => (
          <option key={option.value} value={option.value}>{option.name}</option>
        ))}
      </select>

      {eventsToShow.length > 0 ? (
        <ul role="list" className="divide-y divide-primary-low mt-4">
          {eventsToShow.map((event, index) => (
            <EventCard event={event} key={index} />
          ))}
        </ul>
      ) : (
        <Alert message="No events found." />
      )}
    </div>
  );
}
