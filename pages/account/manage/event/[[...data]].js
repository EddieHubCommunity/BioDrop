import { useState } from "react";
import { authOptions } from "../../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import logger from "@config/logger";
import PageHead from "@components/PageHead";
import Page from "@components/Page";
import Button from "@components/Button";
import Navigation from "@components/account/manage/navigation";
import { getEventApi } from "pages/api/account/manage/event/[[...data]]";
import Input from "@components/form/Input";
import EventCard from "@components/event/EventCard";
import Toggle from "@components/form/Toggle";
import Notification from "@components/Notification";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  const username = session.username;
  const id = context.query.data ? context.query.data[0] : undefined;
  let event = {};
  if (id) {
    try {
      event = await getEventApi(username, id);
    } catch (e) {
      logger.error(e, `event failed for username: ${username}`);
    }
  }

  return {
    props: { event, BASE_URL: process.env.NEXT_PUBLIC_BASE_URL },
  };
}

export default function Event({ BASE_URL, event }) {
  const [showNotification, setShowNotification] = useState(false);
  const [isVirtual, setIsVirtual] = useState(event.isVirtual);
  const [name, setName] = useState(event.name);
  const [description, setDescription] = useState(event.description);
  const [url, setUrl] = useState(event.url);
  const [startDate, setStartDate] = useState(event.date?.start);
  const [endDate, setEndDate] = useState(event.date?.end);
  const [price, setPrice] = useState(event.price);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let putEvent = {
      name,
      description,
      url,
      date: { start: startDate, end: endDate },
      isVirtual,
      price,
      order: event.order,
    };
    let apiUrl = `${BASE_URL}/api/account/manage/event/`;
    if (event._id) {
      putEvent = { ...putEvent, id: event._id };
      apiUrl = `${BASE_URL}/api/account/manage/event/${event._id}`;
    }
    const res = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(putEvent),
    });
    await res.json();
    setShowNotification(true);
  };

  return (
    <>
      <PageHead
        title="Manage Milstone"
        description="Here you can manage your LinkFree event"
      />

      <Page>
        <Navigation />

        <Notification
          show={showNotification}
          type="success"
          onClose={() => setShowNotification(false)}
          message="Event saved"
          additionalMessage="Your event information has been saved successfully."
        />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 xl:gap-x-48">
          <form
            className="space-y-8 divide-y divide-gray-200"
            onSubmit={handleSubmit}
          >
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
              <div className="space-y-6 sm:space-y-5">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    What events would you like to appear on your profile?
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Tip: Add future events to your profile
                  </p>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <Input
                      name="name"
                      label="Name"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                  </div>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <Input
                      name="description"
                      label="Description"
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                    />
                  </div>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <Input
                      name="url"
                      label="Url"
                      onChange={(e) => setUrl(e.target.value)}
                      value={url}
                    />
                  </div>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <Input
                      name="date"
                      label="Start Date"
                      onChange={(e) => setStartDate(e.target.value)}
                      value={startDate}
                    />
                  </div>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <Input
                      name="date"
                      label="End Date"
                      onChange={(e) => setEndDate(e.target.value)}
                      value={endDate}
                    />
                  </div>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <Input
                      name="price"
                      label="Price"
                      onChange={(e) => setPrice(e.target.value)}
                      value={price}
                    />
                  </div>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <Toggle
                      text1="Is Virtual?"
                      text2="no/yes"
                      enabled={isVirtual}
                      setEnabled={setIsVirtual}
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <Button primary={true}>SAVE</Button>
                </div>
              </div>
            </div>
          </form>
          <div>
            <EventCard
              event={{
                name,
                description,
                url,
                date: { start: startDate, end: endDate },
                isVirtual,
                price,
              }}
            />
          </div>
        </div>
      </Page>
    </>
  );
}
