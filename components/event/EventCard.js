import { useEffect, useState } from "react";
import { FaMicrophoneAlt, FaMapPin, FaExternalLinkAlt } from "react-icons/fa";
import {
  MdOutlineOnlinePrediction,
  MdOutlinePeople,
  MdOutlineArrowRightAlt,
} from "react-icons/md";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { TbCoin, TbCoinOff } from "react-icons/tb";

import Link from "@components/Link";
import FallbackImage from "@components/FallbackImage";
import Edit from "@components/account/manage/edit";

export default function EventCard({ manage, event, usernames }) {
  const fallbackImageSize = 60;

  const [startTime, setStartTime] = useState(event.date.start);
  const [endTime, setEndTime] = useState(event.date.end);

  useEffect(() => {
    const dateTimeStyle = {
      dateStyle: "full",
      timeStyle: "long",
    };
    try {
      setStartTime(
        new Intl.DateTimeFormat("en-GB", dateTimeStyle).format(
          new Date(event.date.start)
        )
      );
      setEndTime(
        new Intl.DateTimeFormat("en-GB", dateTimeStyle).format(
          new Date(event.date.end)
        )
      );
    } catch (e) {
      setStartTime(event.date.start);
      setEndTime(event.date.end);
    }
  }, [event.date]);

  const item = (event) => (
    <div
      className="py-4 border-l-[3px] border-t border-secondary-medium dark:border-primary-low mb-4 pl-2 rounded-lg shadow-lg transition duration-350 dark:bg-primary-medium hover:scale-[.99] hover:shadow-sm duration-500 ease-in-out grow"
      style={{
        borderColor: event.color,
      }}
    >
      <div className="flex space-x-3">
        <div className="flex flex-col place-content-center">
          {event.isVirtual && (
            <MdOutlineOnlinePrediction title="Virtual event" />
          )}
          {event.isInPerson && <MdOutlinePeople title="In person event" />}
          {event.date.cfpOpen && <FaMicrophoneAlt title="CFP is open" />}
          {event.price?.startingFrom > 0 && <TbCoin title="Paid event" />}
          {event.price?.startingFrom === 0 && <TbCoinOff title="Free event" />}
        </div>
        <div className="flex-1 space-y-1 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg lg:text-xl tracking-wide font-medium capitalize">
                    {event.name}
                  </span>
                  {event.url && (
                    <Link
                      href={event.url}
                      target="_blank"
                      aria-label={`Visit event ${event.name}`}
                    >
                      <FaExternalLinkAlt />
                    </Link>
                  )}
                </div>
                {event.userStatus && (
                  <div className="text-primary-medium-low dark:text-primary-low-medium italic hidden lg:block">
                    {event.userStatus}
                    {event.userStatus == "speaking" && " at "} this event
                    {event.userStatus == "speaking" && event?.speakingTopic && (
                      <>
                        {" "}
                        on <b>{event.speakingTopic}</b>
                      </>
                    )}
                  </div>
                )}
              </div>
              <p className="text-sm text-primary-high dark:text-primary-low flex flex-col lg:flex-row gap-2">
                <span>{startTime}</span>
                <MdOutlineArrowRightAlt className="self-center hidden lg:block" />
                <span>{endTime}</span>
              </p>
              <ReactMarkdown className="text-sm text-primary-medium dark:text-primary-low-medium py-1 flex-wrap">
                {event.description}
              </ReactMarkdown>
              <p className="text-sm text-primary-high dark:text-primary-low-medium py-1 flex gap-2 flex-wrap">
                {(event.isVirtual || (event.isInPerson && event.location)) && (
                  <FaMapPin />
                )}
                <span>
                  {event.isVirtual && "Remote"}
                  {event.isVirtual &&
                    event.isInPerson &&
                    event.location &&
                    " AND in "}
                  {event.isInPerson &&
                    event.location &&
                    Object.values(event.location).join(", ")}
                </span>
              </p>
            </div>
            <div className="isolate flex -space-x-1 ">
              {usernames &&
                usernames.map((username) => {
                  return (
                    <Link
                      href={`/${username}`}
                      key={username}
                      aria-label={`Visit user ${username}`}
                      className="hidden lg:block h-10 w-10"
                    >
                      <FallbackImage
                        src={`https://github.com/${username}.png`}
                        alt={`Profile picture of ${username}`}
                        width={fallbackImageSize}
                        height={fallbackImageSize}
                        fallback={username}
                        className="relative z-30 inline-block rounded-full ring-2 ring-white"
                      />
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const edit = (event) => (
    <Edit
      href={`/account/manage/event/${event._id}`}
      label={`${event.name} Event`}
    >
      {item(event)}
    </Edit>
  );

  return (
    <li className="flex flex-row gap-8 w-full">
      {manage ? edit(event) : item(event)}
    </li>
  );
}
