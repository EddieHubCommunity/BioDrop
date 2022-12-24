import Link from "next/link";
import {
  MdOutlineOnlinePrediction,
  MdOutlinePeople,
  MdOutlineArrowRightAlt,
} from "react-icons/md";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

import FallbackImage from "./FallbackImage";

export default function Event({ event, username }) {
  const fallbackImageSize = 60;
  const dateTimeStyle = {
    dateStyle: "full",
    timeStyle: "long",
  };

  return (
    <li
      className="py-4 border-l-2 mb-4 pl-2 hover:border-l-4 pr-2 shadow-md"
      style={{
        borderColor: event.color,
      }}
    >
      <div className="flex space-x-3">
        <div className="flex flex-col place-content-center">
          {event.isVirtual && (
            <MdOutlineOnlinePrediction title="Virual event" />
          )}
          {event.isInPerson && <MdOutlinePeople title="In pesron event" />}
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <div>
              <Link
                href={event.url}
                key={event.url}
                target="_blank"
                rel="noreferrer"
                className="text-lg font-medium"
              >
                {event.name}
              </Link>
              <ReactMarkdown className="text-sm text-gray-500">
                {event.description}
              </ReactMarkdown>
              <p className="text-sm text-gray-800 flex flex-row">
                {new Intl.DateTimeFormat("en-GB", dateTimeStyle).format(
                  new Date(event.date.start)
                )}
                <MdOutlineArrowRightAlt className="self-center" />
                {new Intl.DateTimeFormat("en-GB", dateTimeStyle).format(
                  new Date(event.date.end)
                )}
              </p>
            </div>
            {username && (
              <Link href={`/${username}`} className="group block flex-shrink-0">
                <FallbackImage
                  src={`https://github.com/${username}.png`}
                  alt={`Profile picture of ${username}`}
                  width={fallbackImageSize}
                  height={fallbackImageSize}
                  fallback={username}
                  className="rounded-full"
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}
