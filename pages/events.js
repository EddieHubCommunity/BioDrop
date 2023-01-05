import Head from "next/head";
import { useState } from "react";

import EventCard from "../components/event/EventCard";
import Alert from "../components/Alert";
import Page from "../components/Page";
import EventKey from "../components/event/EventKey";
import { useState } from "react";

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
  const [eventType, seteventType] = useState();
  let displayEvents = [];
  switch (eventType) {
    case "virtual":
      displayEvents = events.filter((event) => event.isVirtual === true);
      break;
    case "in-person":
      displayEvents = events.filter((event) => event.isInPerson === true);
      break;
    default:
      displayEvents = events;
  }

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
          events={events}
          onToggleEventType={(newValue) => seteventType(newValue)}
        />

        {!events.length && <Alert type="info" message="No events found" />}
        <ul role="list" className="divide-y divide-gray-200">
          {displayEvents.map((event) => (
            <EventCard
              event={event}
              username={event.username}
              key={event.name}
            />
          ))}
        </ul>
      </Page>
    </>
  );
}
