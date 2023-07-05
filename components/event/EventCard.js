import { useEffect, useState } from "react";
import { FaMicrophoneAlt, FaMapPin, FaExternalLinkAlt } from "react-icons/fa";
import {
  MdOutlineOnlinePrediction,
  MdOutlinePeople,
  MdOutlineArrowRightAlt,
} from "react-icons/md";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { TbCoin, TbCoinOff } from "react-icons/tb";
import { formatDate } from "@services/utils/formatDate";
import Link from "@components/Link";
import FallbackImage from "@components/FallbackImage";
import Edit from "@components/account/manage/edit";

export default function EventCard({ manage, event, usernames }) {
  const fallbackImageSize = 60;

  const [startTime, setStartTime] = useState(event.date.start);
  const [endTime, setEndTime] = useState(event.date.end);

  useEffect(() => {
    try {
      setStartTime(formatDate(new Date(event.date.start)));
      setEndTime(formatDate(new Date(event.date.end)));
    } catch (e) {
      setStartTime(event.date.start);
      setEndTime(event.date.end);
    }
  }, [event.date]);

  const item = (event) => (
    <div
      className="py-4 border-l-3 mb-4 pl-2 rounded-lg shadow-lg transition duration-350 dark:bg-primary-medium hover:scale-[.99] hover:shadow-sm duration-500 ease-in-out grow"
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
        <div className="flex-1 p-4 space-y-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-medium tracking-wide capitalize lg:text-xl">
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
                  <div className="hidden italic text-primary-medium-low dark:text-primary-low-medium lg:block">
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
              <p className="flex flex-col gap-2 text-sm text-primary-high dark:text-primary-low lg:flex-row">
                <span>{startTime}</span>
                <MdOutlineArrowRightAlt className="self-center hidden lg:block" />
                <span>{endTime}</span>
              </p>
              <ReactMarkdown className="flex-wrap py-1 text-sm text-primary-medium dark:text-primary-low-medium">
                {event.description}
              </ReactMarkdown>
              <p className="flex flex-wrap gap-2 py-1 text-sm text-primary-high dark:text-primary-low-medium">
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
            <div className="flex -space-x-1 isolate ">
              {usernames &&
                usernames.map((username) => {
                  return (
                    <Link
                      href={`/${username}`}
                      key={username}
                      aria-label={`Visit user ${username}`}
                      className="hidden w-10 h-10 lg:block"
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
    <Edit href={`/account/manage/event/${event._id}`}>{item(event)}</Edit>
  );

  return (
    <li className="flex flex-row w-full gap-8">
      {manage ? edit(event) : item(event)}
    </li>
  );
}
