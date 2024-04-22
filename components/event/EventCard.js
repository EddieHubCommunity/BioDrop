import { useEffect, useState } from "react";
import {
  FaMicrophoneLines,
  FaMapPin,
  FaUpRightFromSquare,
} from "react-icons/fa6";
import {
  MdOutlineOnlinePrediction,
  MdOutlinePeople,
  MdOutlineArrowRightAlt,
} from "react-icons/md";
import { TbCoin, TbCoinOff } from "react-icons/tb";

import Link from "@components/Link";
import FallbackImage from "@components/FallbackImage";
import Edit from "@components/account/manage/Edit";
import dateFormat from "@services/utils/dateFormat";
import Markdown from "@components/Markdown";
import TagSimple from "@components/tag/TagSimple";

export default function EventCard({ manage, event, usernames }) {
  const fallbackImageSize = 60;

  const [startTime, setStartTime] = useState(event.date.start);
  const [endTime, setEndTime] = useState(event.date.end);

  useEffect(() => {
    try {
      setStartTime(
        dateFormat({ locale: "local", format: "long", date: event.date.start }),
      );
      setEndTime(
        dateFormat({ locale: "local", format: "long", date: event.date.end }),
      );
    } catch (e) {
      setStartTime(event.date.start);
      setEndTime(event.date.end);
    }
  }, [event.date]);

  const item = (event) => (
    <div
      className="py-4 border-l-[3px] border-t border-secondary-medium dark:border-primary-low mb-4 pl-2 rounded-lg shadow-lg transition duration-350 dark:bg-primary-medium hover:scale-[.99] hover:shadow-sm duration-500 ease-in-out grow"
      style={event.color ? { borderColor: event.color } : null}
    >
      <div className="flex space-x-3">
        <div className="flex flex-col place-content-center">
          {event.isVirtual && (
            <MdOutlineOnlinePrediction title="Virtual event" />
          )}
          {event.isInPerson && <MdOutlinePeople title="In person event" />}
          {event.date.cfpOpen && <FaMicrophoneLines title="CFP is open" />}
          {event.price?.startingFrom > 0 && <TbCoin title="Paid event" />}
          {event.price?.startingFrom === 0 && <TbCoinOff title="Free event" />}
        </div>
        <div className="flex-1 space-y-1 px-4">
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
                      <FaUpRightFromSquare />
                    </Link>
                  )}
                </div>
                {event.isSpeaking && (
                  <div className="text-primary-medium-low dark:text-primary-low-medium italic hidden lg:block">
                    {"Speaking at "} this event
                    {event?.speakingTopic && (
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
              <Markdown className="text-sm text-primary-medium dark:text-primary-low-medium py-1 flex-wrap">
                {event.description}
              </Markdown>
            </div>
            <div className="isolate flex space-x-1">
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
          <div className="flex justify-between">
            <div className="text-sm text-primary-high dark:text-primary-low-medium py-1 flex justify-between">
              <div className="flex gap-2 flex-wrap">
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
              </div>
            </div>
            {event.price?.startingFrom > 0 ? (
              <div className="flex justify-end items-center">
                <div>${event.price?.startingFrom}</div>
              </div>
            ) : (
              <div className="flex justify-end items-center">
                <div>Free</div>
              </div>
            )}
          </div>
        </div>
      </div>
      {event.tags?.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2">
          {event.tags.map((tag, index) => {
            const trimmedTag = tag.trim();
            if (!trimmedTag) {
              return null;
            }

            return <TagSimple name={trimmedTag} key={index} />;
          })}
        </div>
      )}
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
