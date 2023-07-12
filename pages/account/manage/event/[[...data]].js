import Router from "next/router";
import { useState } from "react";
import { authOptions } from "../../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import { clientEnv } from "@config/schemas/clientSchema";
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
import ConfirmDialog from "@components/ConfirmDialog";

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
    props: { event, BASE_URL: clientEnv.NEXT_PUBLIC_BASE_URL },
  };
}

export default function ManageEvent({ BASE_URL, event }) {
  const [open, setOpen] = useState(false);
  const formatDate = (inputDate) => {
    const d = new Date(inputDate);
    const date = d.toISOString().split("T")[0];
    const time = d.toLocaleTimeString();

    return `${date}T${time}`;
  };
  const [showNotification, setShowNotification] = useState({
    show: false,
    type: "",
    message: "",
    additionalMessage: "",
  });
  const [isVirtual, setIsVirtual] = useState(event.isVirtual ? true : false);
  const [name, setName] = useState(event.name || "");
  const [description, setDescription] = useState(event.description || "");
  const [url, setUrl] = useState(event.url || "");
  const [startDate, setStartDate] = useState(
    event.date?.start && formatDate(event.date?.start)
  );
  const [endDate, setEndDate] = useState(
    event.date?.end && formatDate(event.date?.end)
  );
  const [price, setPrice] = useState(event.price?.startingFrom || 0);
  const [color, setColor] = useState(event.color || "" );

  const handleSubmit = async (e) => {
    e.preventDefault();

    let putEvent = {
      name,
      description,
      url,
      date: { start: startDate, end: endDate },
      isVirtual,
      price: { startingFrom: price },
      color,
    };
    let apiUrl = `${BASE_URL}/api/account/manage/event/`;
    if (event._id) {
      putEvent = { ...putEvent, _id: event._id };
      apiUrl = `${BASE_URL}/api/account/manage/event/${event._id}`;
    }
    const res = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(putEvent),
    });
    const update = await res.json();

    if (update.message) {
      return setShowNotification({
        show: true,
        type: "error",
        message: "Event add/update failed",
        additionalMessage: `Please check the fields: ${Object.keys(
          update.message
        ).join(", ")}`,
      });
    }

    Router.push(`${BASE_URL}/account/manage/event/${update._id}`);

    return setShowNotification({
      show: true,
      type: "success",
      message: "Event added/updated",
      additionalMessage: "Your event has been added/updated successfully",
    });
  };

  const deleteItem = async () => {
    const res = await fetch(
      `${BASE_URL}/api/account/manage/event/${event._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const update = await res.json();

    if (update.error || update.message) {
      return setShowNotification({
        show: true,
        type: "error",
        message: "Event delete failed",
        additionalMessage: update.error || update.message,
      });
    }

    return Router.push(`${BASE_URL}/account/manage/events`);
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
          show={showNotification.show}
          type={showNotification.type}
          onClose={() =>
            setShowNotification({ ...showNotification, show: false })
          }
          message={showNotification.message}
          additionalMessage={showNotification.additionalMessage}
        />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 xl:gap-x-48">
          <form
            className="space-y-8 divide-y divide-primary-low-medium/30"
            onSubmit={handleSubmit}
          >
            <div className="space-y-8 divide-y divide-primary-low-medium/30 sm:space-y-5">
              <div className="space-y-6 sm:space-y-5">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-primary-high">
                    What Events would you like to appear on your Profile?
                  </h3>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-primary-low-medium/30 sm:pt-5">
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <Input
                      name="name"
                      label="Event Name"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      placeholder="Official name of the Event"
                      required
                      minLength="2"
                      maxLength="256"
                    />
                    <p className="text-sm text-primary-low-medium">
                      For example: <i>EddieCon v0.1</i>
                    </p>
                  </div>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <Input
                      name="description"
                      label="Description"
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                      placeholder="Description of the event from their website"
                    />
                  </div>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <Input
                      type="url"
                      name="url"
                      label="Event URL"
                      onChange={(e) => setUrl(e.target.value)}
                      value={url}
                      placeholder="https://www.example.com"
                      required
                      minLength="2"
                      maxLength="256"
                    />
                  </div>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <Input
                      type="datetime-local"
                      name="start-date"
                      label="Start Date"
                      onChange={(e) => setStartDate(e.target.value)}
                      value={startDate}
                      required
                    />
                    <p className="text-sm text-primary-low-medium">
                      For example: In <i>DD / MM / YYYY, HH:MM</i>
                    </p>
                  </div>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <Input
                      type="datetime-local"
                      name="end-date"
                      label="End Date"
                      onChange={(e) => setEndDate(e.target.value)}
                      value={endDate}
                      required
                    />
                    <p className="text-sm text-primary-low-medium">
                      For example: In <i>DD / MM / YYYY, HH:MM</i>
                    </p>
                  </div>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <Input
                      type="number"
                      min="0"
                      name="price"
                      label="Ticket Price"
                      onChange={(e) => setPrice(e.target.value)}
                      value={price}
                    />
                    <p className="text-sm text-primary-low-medium">
                      Basic ticket price in USD (for free use 0)
                    </p>
                  </div>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <Toggle
                      text1="Virtual?"
                      text2="Online event"
                      enabled={isVirtual}
                      setEnabled={setIsVirtual}
                    />
                  </div>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <Input
                      name="color"
                      label="Color"
                      onChange={(e) => setColor(e.target.value)}
                      value={color}
                      minLength="2"
                      maxLength="16"
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  {event._id && (
                    <Button type="button" onClick={() => setOpen(true)}>
                      DELETE
                    </Button>
                  )}
                  <Button type="submit" primary={true}>
                    SAVE
                  </Button>
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
                color,
              }}
            />
          </div>
        </div>
      </Page>
      <ConfirmDialog
        open={open}
        action={deleteItem}
        setOpen={setOpen}
        title="Delete event"
        description="Are you sure?"
      />
    </>
  );
}
