import Head from "next/head";
import { useState } from "react";
import EventCard from "../components/event/EventCard";
import Page from "../components/Page";
import { EventTabs } from "../components/event/EventTabs";
import { FaListUl, FaMicrophoneAlt } from "react-icons/fa";
import { MdOutlineOnlinePrediction, MdOutlinePeople } from "react-icons/md";

export async function getServerSideProps(context) {
  let events = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events`);
    events = await res.json();
  } catch (e) {
    console.log("ERROR search users", e);
  }

  return {
    props: { events },
  };
}

export default function Events({ events }) {
  let categorisedEvents = {
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
      total: categorisedEvents.all.length,
    },
    {
      title: "CFP open",
      description: "You can submit a talk to this conference",
      key: "cfpOpen",
      icon: FaMicrophoneAlt,
      total: categorisedEvents.cfpOpen.length,
    },
    {
      title: "In person",
      description: "These are in person events",
      key: "inPerson",
      icon: MdOutlinePeople,
      total: categorisedEvents.inPerson.length,
    },
    {
      title: "Virtual",
      description: "Held virtually online event",
      key: "virtual",
      icon: MdOutlineOnlinePrediction,
      total: categorisedEvents.virtual.length,
    },
  ];

  const [tabs, setTabs] = useState(filters);
  const [eventType, setEventType] = useState("all");

  return (
    <>
      <Head>
        <title>Events the community members are going to</title>
        <meta name="description" content="Search LinkFree user directory" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page>
        <h1 className="text-4xl mb-4 font-bold">Community events</h1>
        <EventTabs
          tabs={tabs}
          eventType={eventType}
          setEventType={setEventType}
        />
        <ul role="list" className="divide-y divide-gray-200 mt-6">
          <h2 className="text-md md:text-2xl text-lg text-gray-600 font-bold md:mb-6 mb-3">
            {filters.find((filter) => filter.key === eventType).description}
          </h2>

          {categorisedEvents[eventType]?.map((event) => (
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
