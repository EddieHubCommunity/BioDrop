import { MdOutlineOnlinePrediction, MdOutlinePeople } from "react-icons/md";

export default function EventPreview({ event, username }) {
  return (
    <div className="flex flex-col rounded grow md:rounded-full md:flex-row border-2 border-gray-200 hover:border-orange-600 p-4 my-2 px-6">
      <div className="grow">
        <p className="text-3xl font-bold flex gap-3">
          {event.isVirtual && <MdOutlineOnlinePrediction />}
          {event.isInPerson && <MdOutlinePeople />}
          <span>{event.name}</span>
        </p>
        <p className="text-1xl">{event.description}</p>
      </div>
      <div className="min-w-fit">
        <p className="text-1xl font-bold">
          {new Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "long",
            day: "2-digit",
          }).format(new Date(event.date))}
        </p>
        Join{" "}
        <a
          href={username}
          className="underline decoration-orange-600 hover:text-orange-600 font-semibold"
        >
          {username}
        </a>{" "}
        at this{" "}
        <a
          href={event.link}
          className="underline decoration-orange-600 hover:text-orange-600 font-semibold"
        >
          event
        </a>
      </div>
    </div>
  );
}
