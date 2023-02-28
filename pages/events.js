import { useState } from "react";
import { FaListUl, FaMicrophoneAlt } from "react-icons/fa";
import { MdOutlineOnlinePrediction, MdOutlinePeople } from "react-icons/md";
import { getEvents } from "./api/events";

import EventCard from "../components/event/EventCard";
import Page from "../components/Page";
import { EventTabs } from "../components/event/EventTabs";
import PageHead from "../components/PageHead";
import Badge from "../components/Badge";
import logger from "../config/logger";

export async function getServerSideProps(context) {
  let eventsArray = [];
  const {statusCode, events} = await getEvents();
  if (statusCode !== 200) {
    logger.error(events.error, "ERROR get events");
  } else {
    eventsArray = events.eventsArray;
  }

  return {
    props: {
      events: eventsArray
    },
  };
}

export default function Events({ events }) {
  let categorizedEvents = {
    all: events,
    virtual: events.filter((event) => event.isVirtual === true),
    inPerson: events.filter((event) => event.isInPerson === true),
    cfpOpen: events.filter((event) =>
      event.date.cfpClose ? new Date(event.date.cfpClose) > new Date() : false
    ),
  };
  const filters = [
    {
      title: "Show all",
      description: "List all events with no filters",
      key: "all",
      icon: FaListUl,
      total: categorizedEvents.all.length,
    },
    {
      title: "CFP open",
      description: "You can submit a talk to this conference",
      key: "cfpOpen",
      icon: FaMicrophoneAlt,
      total: categorizedEvents.cfpOpen.length,
    },
    {
      title: "In person",
      description: "These are in person events",
      key: "inPerson",
      icon: MdOutlinePeople,
      total: categorizedEvents.inPerson.length,
    },
    {
      title: "Virtual",
      description: "Held virtually online event",
      key: "virtual",
      icon: MdOutlineOnlinePrediction,
      total: categorizedEvents.virtual.length,
    },
  ];

  const [tabs, setTabs] = useState(filters);
  const [eventType, setEventType] = useState("all");

  return (
    <>
      <PageHead
        title="Events the LinkFree community members are interested in"
        description="Events by the LinkFree community"
      />

      <Page>
        <div className="flex flex-row items-center">
          <Badge
            content="?"
            path="/docs/how-to-guides/events"
            title="Go To Event Docs"
            badgeClassName={"translate-x-2/4 -translate-y-1/2"}
          >
            <h1 className="text-4xl mb-4 font-bold ">Community events</h1>
          </Badge>
        </div>
        <EventTabs
          tabs={tabs}
          eventType={eventType}
          setEventType={setEventType}
        />
        <ul role="list" className="divide-y divide-gray-200 mt-6">
          <h2 className="text-md md:text-2xl text-lg text-gray-800 font-bold md:mb-6 mb-3">
            {filters.find((filter) => filter.key === eventType).description}
          </h2>

          {categorizedEvents[eventType]?.map((event) => (
            <EventCard
              event={event}
              username={event.username}
              key={`${event.name} ${event.username}`}
            />
          ))}
        </ul>
      </Page>
    </>
  );
}
