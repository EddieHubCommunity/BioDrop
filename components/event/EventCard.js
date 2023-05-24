import { FaMicrophoneAlt, FaMapPin } from "react-icons/fa";
import {
  MdOutlineOnlinePrediction,
  MdOutlinePeople,
  MdOutlineArrowRightAlt,
} from "react-icons/md";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { TbCoin, TbCoinOff } from "react-icons/tb";

import Link from "@components/Link";
import FallbackImage from "@components/FallbackImage";

export default function EventCard({ event, username, users }) {
  const fallbackImageSize = 60;
  const dateTimeStyle = {
    dateStyle: "full",
    timeStyle: "long",
  };

  return (
    <li
      className="py-4 border-l-3 mb-4 pl-2 rounded-lg shadow-lg transition duration-350 dark:bg-primary-medium hover:scale-[.99] hover:shadow-sm duration-500 ease-in-out"
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
          {event.date.cfpClose &&
            new Date(event.date.cfpClose) > new Date() && (
              <FaMicrophoneAlt title="CFP is open" />
            )}
          {event.price?.startingFrom > 0 && <TbCoin title="Paid event" />}
          {event.price?.startingFrom === 0 && <TbCoinOff title="Free event" />}
        </div>
        <div className="flex-1 space-y-1 p-4">
          <div className="flex items-center justify-between">
            <Link
              href={event.url}
              key={event.url}
              target="_blank"
              rel="noreferrer"
              className="text-decoration-line:none"
            >
              <div className="flex justify-between">
                <p className="text-lg lg:text-xl tracking-wide font-medium capitalize">
                  {event.name}
                </p>
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
                <span>
                  {new Intl.DateTimeFormat("en-GB", dateTimeStyle).format(
                    new Date(event.date.start)
                  )}
                </span>
                <MdOutlineArrowRightAlt className="self-center hidden lg:block" />
                <span>
                  {new Intl.DateTimeFormat("en-GB", dateTimeStyle).format(
                    new Date(event.date.end)
                  )}
                </span>
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
            </Link>
            <div className="isolate flex -space-x-1 ">
              {
                users && (
                  users.map((user) => {
                    return (
                      <Link
                        href={`/${user}`}
                        key={user.name}
                        className=" hidden lg:block "
                      >
                        <FallbackImage
                          src={`https://github.com/${user}.png`}
                          alt={`Profile picture of ${user}`}
                          width={fallbackImageSize}
                          height={fallbackImageSize}
                          fallback={user}
                          className="relative z-30 inline-block rounded-full ring-2 ring-white"
                        />
                        {/* <img
                          className="relative z-30 inline-block h-6 w-6 rounded-full ring-2 ring-white"
                          src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                          width={fallbackImageSize}
                          height={fallbackImageSize}
                          fallback={user}
                        /> */}
                      </Link>
                    )
                  })
                )
              }
            </div>
            {/* {username && (
              <Link
                href={`/${username}`}
                className="group hidden lg:block flex-shrink-0 lg:pr-4"
              >
                <FallbackImage
                  src={`https://github.com/${username}.png`}
                  alt={`Profile picture of ${username}`}
                  width={fallbackImageSize}
                  height={fallbackImageSize}
                  fallback={username}
                  className="rounded-full"
                />
              </Link>
            )} */}
          </div>
        </div>
      </div>
    </li>
  );
}
