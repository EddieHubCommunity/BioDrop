import { useState } from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { clientEnv } from "@config/schemas/clientSchema";

import logger from "@config/logger";
import Page from "@components/Page";
import PageHead from "@components/PageHead";
import { getEvents } from "../api/admin/events";

import Navigation from "@components/admin/Navigation";
import Toggle from "@components/form/Toggle";
import Notification from "@components/Notification";
import { PROJECT_NAME } from "@constants/index";
import Bulb from "@components/Bulb";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const username = session.username;

  let events = [];
  try {
    events = await getEvents();
  } catch (e) {
    logger.error(e, "get events failed");
  }

  return {
    props: {
      username,
      events,
      BASE_URL: clientEnv.NEXT_PUBLIC_BASE_URL,
    },
  };
}

export default function Events({ events }) {
  const [eventList, setEventList] = useState(events);
  const [showNotification, setShowNotification] = useState({
    show: false,
    type: "",
    message: "",
    additionalMessage: "",
  });

  const toggle = async ({ _id, username, isEnabled }) => {
    const res = await fetch(`/api/admin/events/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        isEnabled: isEnabled === undefined || isEnabled ? false : true,
      }),
    });
    const updatedEvent = await res.json();
    if (updatedEvent.error) {
      return setShowNotification({
        show: true,
        type: "error",
        message: "Event update failed",
        additionalMessage: updatedEvent.error,
      });
    }

    setEventList(
      eventList.map((event) => (event._id === _id ? updatedEvent : event)),
    );

    return setShowNotification({
      show: true,
      type: "success",
      message: "Event updated",
      additionalMessage: `Event ${updatedEvent.name} has been updated successfully`,
    });
  };

  return (
    <>
      <PageHead
        title={`${PROJECT_NAME} admin over`}
        description={`Overview for ${PROJECT_NAME} admins`}
      />
      <Page>
        <Navigation />
        <h1 className="text-4xl mb-4 font-bold">Events</h1>

        <Notification
          show={showNotification.show}
          type={showNotification.type}
          onClose={() =>
            setShowNotification({ ...showNotification, show: false })
          }
          message={showNotification.message}
          additionalMessage={showNotification.additionalMessage}
        />

        <ul role="list" className="divide-y divide-primary-low">
          {eventList.map((event) => (
            <li key={event._id} className="flex justify-between gap-x-6 py-5">
              <div className="flex gap-x-4">
                <Toggle
                  enabled={
                    event.isEnabled === undefined || event.isEnabled
                      ? true
                      : false
                  }
                  setEnabled={() =>
                    toggle({
                      _id: event._id,
                      username: event.username,
                      isEnabled: event.isEnabled,
                    })
                  }
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-primary-high dark:text-primary-low">
                    {event.name}
                  </p>
                  <div className="mt-1 truncate text-xs leading-5 text-primary-medium dark:text-primary-low-medium flex flex-row content-center gap-2 place-items-center">
                    <Bulb isEnabled={!event.isShadowBanned} />
                    <span>{event.username}</span>
                  </div>
                </div>
              </div>
              <div className="hidden sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-primary-high dark:text-primary-low">
                  {event.url}
                </p>
                <p className="mt-1 text-xs leading-5 text-primary-medium dark:text-primary-low">
                  {event.date?.start} - {event.date?.end}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Page>
    </>
  );
}
