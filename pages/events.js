import { useState } from "react";
import { FaListUl, FaMicrophoneAlt } from "react-icons/fa";
import { MdOutlineOnlinePrediction, MdOutlinePeople } from "react-icons/md";
import { TbCoin, TbCoinOff } from "react-icons/tb";

import { getEvents } from "./api/events";

import logger from "@config/logger";
import EventCard from "@components/event/EventCard";
import Page from "@components/Page";
import { EventTabs } from "@components/event/EventTabs";
import PageHead from "@components/PageHead";
import Badge from "@components/Badge";

export async function getServerSideProps(context) {
  let events = await getEvents();

  // remove any invalid events
  events = events.filter((event) => {
    const dateTimeStyle = {
      dateStyle: "full",
      timeStyle: "long",
    };
    try {
      new Intl.DateTimeFormat("en-GB", dateTimeStyle).format(
        new Date(event.date.start)
      );
      new Intl.DateTimeFormat("en-GB", dateTimeStyle).format(
        new Date(event.date.end)
      );

      return true;
    } catch (e) {
      logger.error(e, `ERROR event date for: "${event.name}"`);
      return false;
    }
  });

  return {
    props: { events },
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
    free: events.filter((event) => event.price?.startingFrom === 0),
    paid: events.filter((event) => event.price?.startingFrom > 0),
  };
  const tabFilters = [
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
    {
      title: "Free",
      description: "These events are free to attend",
      key: "free",
      icon: TbCoinOff,
      total: categorizedEvents.free.length,
    },
    {
      title: "Paid",
      description: "These events are paid to attend",
      key: "paid",
      icon: TbCoin,
      total: categorizedEvents.paid.length,
    },
  ];

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
          tabs={tabFilters}
          eventType={eventType}
          setEventType={setEventType}
        />
        <h2 className="text-md md:text-2xl text-lg text-primary-high font-bold md:mb-6 mb-3">
          {tabFilters.find((filter) => filter.key === eventType).description}
        </h2>
        <ul role="list" className="divide-y divide-primary-low mt-6">
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
