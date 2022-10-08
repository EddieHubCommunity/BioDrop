import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import EventPreview from "../components/events/EventPreview";
import app from "../config/app.json";

export async function getServerSideProps(context) {
  let users = [];
  try {
    const res = await fetch(`${app.baseUrl}/api/users`);
    users = await res.json();
  } catch (e) {
    console.log("ERROR search users", e);
  }

  return {
    props: { users },
  };
}

export default function Events({ users }) {

  return (
    <>
      <Head>
        <title>LinkFree Check Events</title>
        <meta name="description" content="Search LinkFree user directory" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col px-6 align-center">
        <ul>
          {users.map((user) => {
            if (user.events) {
              const events = user.events
              return (
                events.map((event) => (
                  <li key={event.name}>
                    <EventPreview event={ event } username={ user.username } />
                  </li>
                ))
              )
            }
          })}
        </ul>
      </div>
    </>
  );
}
