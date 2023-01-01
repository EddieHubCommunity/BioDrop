import EventCard from "../event/EventCard";
import Alert from "../Alert";
import EventKey from "../event/EventKey";

export default function UserEvents({ data }) {
  return (
    <div className="mt-6">
      <EventKey />
      {!data.events && <Alert type="info" message="No events found" />}
      <ul role="list" className="divide-y divide-gray-200">
        {data.events &&
          data.events.map((event, index) => (
            <EventCard event={event} key={index} />
          ))}
      </ul>
    </div>
  );
}
