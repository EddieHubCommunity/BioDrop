import Head from "next/head";
import { IconContext } from "react-icons";
import { MdOutlineOnlinePrediction, MdOutlinePeople } from "react-icons/md";

import Event from "../components/Event";
import Alert from "../components/Alert";
import Page from "../components/Page";

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
  return (
    <>
      <Head>
        <title>Events the community members are going to</title>
        <meta name="description" content="Search LinkFree user directory" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page>
        <h1 className="text-4xl mb-4 font-bold">Community events</h1>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-6">
          <div className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2">
            <div className="flex-shrink-0">
              <IconContext.Provider value={{ size: "3em" }}>
                <MdOutlinePeople />
              </IconContext.Provider>
            </div>
            <div className="min-w-0 flex-1">
              <span className="absolute inset-0" aria-hidden="true" />
              <p className="text-sm font-medium text-gray-900">In person</p>
              <p className="truncate text-sm text-gray-500">
                These are in person events
              </p>
            </div>
          </div>
          <div className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2">
            <div className="flex-shrink-0">
              <IconContext.Provider value={{ size: "3em" }}>
                <MdOutlineOnlinePrediction />
              </IconContext.Provider>
            </div>
            <div className="min-w-0 flex-1">
              <span className="absolute inset-0" aria-hidden="true" />
              <p className="text-sm font-medium text-gray-900">Virtual</p>
              <p className="truncate text-sm text-gray-500">
                These are virtual events held online
              </p>
            </div>
          </div>
        </div>

        {!events.length && <Alert type="info" message="No events found" />}
        <ul role="list" className="divide-y divide-gray-200">
          {events.map((event, index) => (
            <Event event={event} username={event.author} key={index} />
          ))}
        </ul>
      </Page>
    </>
  );
}
