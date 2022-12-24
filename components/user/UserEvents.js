import Event from "../Event";
import Alert from "../Alert";

export default function UserEvents({ data }) {
  return (
    <>
      {!data.events && <Alert type="info" message="No events found" />}
      <ul role="list" className="divide-y divide-gray-200">
        {data.events &&
          data.events.map((event, index) => (
            <Event event={event} key={index} />
          ))}
      </ul>
    </>
  );
}
