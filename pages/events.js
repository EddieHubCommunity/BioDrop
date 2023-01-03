import Head from "next/head";

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
  console.log('events', events)
  const [eventType, seteventType] = useState('virtual');
  return (
    <>
      <Head>
        <title>Events the community members are going to</title>
        <meta name="description" content="Search LinkFree user directory" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page>
        <h1 className="text-4xl mb-4 font-bold">Community events</h1>

        <EventKey onChange={(newValue) => seteventType(newValue)} />

        {!events.length && <Alert type="info" message="No events found" />}
        <ul role="list" className="divide-y divide-gray-200">
          {events
          .filter((itm, _) => {
            if (eventType === 'virtual') {
              return itm.isVirtual === true 
            } else {
              return itm.isInPerson === true
            }
          })
          .map((event, index) => (
            <EventCard event={event} username={event.username} key={index} />
          ))}
        </ul>
      </Page>
    </>
  );
}
