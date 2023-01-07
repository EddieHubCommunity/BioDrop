import Head from "next/head";
import { useState } from "react";

import EventCard from "../components/event/EventCard";
import Alert from "../components/Alert";
import Page from "../components/Page";
import EventKey from "../components/event/EventKey";

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
  const [eventType, seteventType] = useState("all");
  let categorisedEvents = {
    all: events,
    virtual: events.filter((event) => event.isVirtual === true),
    inPerson: events.filter((event) => event.isInPerson === true),
    cfpOpen: events.filter((event) =>
      event.date.cfpClose ? new Date(event.date.cfpClose) > new Date() : false
    ),
  };

  return (
    <>
      <Head>
        <title>Events the community members are going to</title>
        <meta name="description" content="Search LinkFree user directory" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page>
        <h1 className="text-4xl mb-4 font-bold">Community events</h1>

        <EventKey
          categorisedEvents={categorisedEvents}
          onToggleEventType={(newValue) => seteventType(newValue)}
        />

        {!events.length && <Alert type="info" message="No events found" />}
        <ul role="list" className="divide-y divide-gray-200">
          {categorisedEvents[eventType].map((event, index) => (
            <EventCard event={event} username={event.username} key={index} />
          ))}
        </ul>
      </Page>
    </>
  );
}
