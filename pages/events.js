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
            if (user.events != undefined) {
              const event = user.events
              return (
                event.map((eve) => (
                  <li key={user.username}>
                    <EventPreview event={ eve } username={ user.username } />
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
