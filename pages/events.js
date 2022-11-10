import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import EventPreview from "../components/events/EventPreview";
import app from "../config/app.json";

export async function getServerSideProps(context) {
  let events = [];
  try {
    const res = await fetch(`${app.baseUrl}/api/events`);
    events = await res.json();
  } catch (e) {
    console.log("ERROR search users", e);
  }

  return {
    props: { events },
  };
}

export default function Events({ events }) {
  return (
    <>
      <Head>
        <title>Events the community members are going to</title>
        <meta name="description" content="Search LinkFree user directory" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col px-6 align-center">
        {events.length === 0 && (
          <h2 className="bg-red-200 text-red-600 border-2 border-red-600 p-5 my-5 text-xl">
            No events found
          </h2>
        )}

        <ul>
          {events.map((event) => (
            <li key={event.name}>
              <EventPreview event={event} username={event.author} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
