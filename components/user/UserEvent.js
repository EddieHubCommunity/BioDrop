import { format } from "date-fns";
import { CalendarDaysIcon, MapPinIcon } from "@heroicons/react/20/solid";

import { PAID_OPTIONS } from "./constants";

const UserEvent = ({ event, title }) => {
  return (
    <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
      <dl className="flex flex-wrap">
        <div className="flex-auto pl-6 pt-6">
          <dt className="text-sm font-semibold leading-6 text-gray-900">
            {title}
          </dt>
          <dd className="mt-1 text-lg font-semibold leading-6 text-gray-900">
            {event?.name}
          </dd>
          <dd className="mt-2 text-sm leading-6 text-gray-600">
            {event?.description}
          </dd>
        </div>
        <div className="flex-none self-end px-6 pt-4">
          <dt className="sr-only">Status</dt>
          <dd className="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-600/20">
            {event.price?.startingFrom === 0
              ? PAID_OPTIONS.free
              : PAID_OPTIONS.paid}
          </dd>
        </div>
        {event?.isVirtual && (
          <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
            <dt className="flex-none">
              <span className="sr-only">Location</span>
              <MapPinIcon
                className="h-6 w-5 text-gray-400"
                aria-hidden="true"
              />
            </dt>
            <dd className="text-sm font-medium leading-6 text-gray-900">
              Virtual
            </dd>
          </div>
        )}
        <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
          <dt className="flex-none">
            <span className="sr-only">Due date</span>
            <CalendarDaysIcon
              className="h-6 w-5 text-gray-400"
              aria-hidden="true"
            />
          </dt>
          <dd className="text-sm leading-6 text-gray-500">
            <time dateTime="2023-01-31">
              {format(new Date(event?.date?.start), "MMMM dd, yyyy")}
            </time>
          </dd>
        </div>
      </dl>
      <div className="mt-6 border-t border-gray-900/5 px-6 py-6">
        <a
          href={event?.url}
          target="_blank"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Go to event <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </div>
  );
};

export default UserEvent;
