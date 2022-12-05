import Event from "../Event";
import Alert from "../Alert";

export default function UserEvents({ data }) {
  return (
    <>
      {!data.events && <Alert type="info" message="No events found" />}
      {data.events &&
        data.events.map((event, index) => (
          <div className="flex" key={index}>
            <div className="w-14 border-l-4 flex flex-col">
              <div className="border-dashed border-b-2 grow"></div>
              <div className="grow"></div>
            </div>
            <Event event={event} username={data.username} />
          </div>
        ))}
    </>
  );
}
