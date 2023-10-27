import Router from "next/router";
import { useState, useEffect } from "react";
import { authOptions } from "../../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import { clientEnv } from "@config/schemas/clientSchema";
import logger from "@config/logger";
import PageHead from "@components/PageHead";
import Page from "@components/Page";
import Button from "@components/Button";
import Navigation from "@components/account/manage/Navigation";
import { getEventApi } from "pages/api/account/manage/event/[[...data]]";
import Input from "@components/form/Input";
import EventCard from "@components/event/EventCard";
import Toggle from "@components/form/Toggle";
import Notification from "@components/Notification";
import ConfirmDialog from "@components/ConfirmDialog";
import dateFormat from "@services/utils/dateFormat";
import { PROJECT_NAME } from "@constants/index";
import Textarea from "@components/form/Textarea";
import TagsInput from "@components/tag/TagsInput";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
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

  const [showNotification, setShowNotification] = useState({
    show: false,
    type: "",
    message: "",
    additionalMessage: "",
  });
  const [isVirtual, setIsVirtual] = useState(event.isVirtual ? true : false);
  const [isSpeaking, setIsSpeaking] = useState(event.isSpeaking ? true : false);
  const [name, setName] = useState(event.name || "");
  const [description, setDescription] = useState(event.description || "");
  const [url, setUrl] = useState(event.url || "");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [speakingTopic, setspeakingTopic] = useState(event.speakingTopic || "");
  const [tags, setTags] = useState(event.tags || []);

  useEffect(() => {
    if (!isSpeaking) {
      setspeakingTopic("");
    }
  }, [isSpeaking]);

  const [price, setPrice] = useState(event.price?.startingFrom || 0);
  const [color, setColor] = useState(event.color || "");

  const formatLocalDate = (inputDate) => {
    const d = new Date(inputDate);
    const year = d.getFullYear();
    const month = ("0" + (d.getMonth() + 1)).slice(-2);
    const day = ("0" + d.getDate()).slice(-2);
    const date = `${year}-${month}-${day}`;
    const time = d.toTimeString().split(":");

    return `${date}T${time[0]}:${time[1]}`;
  };

  useEffect(() => {
    if (event.date?.start) {
      setStartDate(formatLocalDate(event.date.start));
    }
    if (event.date?.end) {
      setEndDate(formatLocalDate(event.date.end));
    }
  }, [event]);

  const submitDate = (date) => {
    return new Date(date).toISOString();
  };

  const getTz = (date) => {
    if (!date) return "";
    const localTime = dateFormat({
      locale: "local",
      format: "long",
      date: new Date(date),
    });
    const tz = localTime.split(" ").slice(-1)[0];
    return ` (${tz})`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let alert = "created";
    let putEvent = {
      name,
      description,
      url,
      date: { start: submitDate(startDate), end: submitDate(endDate) },
      isVirtual,
      price: { startingFrom: price },
      isSpeaking,
      speakingTopic,
      color,
      tags,
    };
    let apiUrl = `${BASE_URL}/api/account/manage/event/`;
    if (event._id) {
      alert = "updated";
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
          update.message,
        ).join(", ")}`,
      });
    }

    Router.push(`${BASE_URL}/account/manage/events?alert=${alert}`);
  };

  const deleteItem = async () => {
    const res = await fetch(
      `${BASE_URL}/api/account/manage/event/${event._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
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

    return Router.push(`${BASE_URL}/account/manage/events?alert=deleted`);
  };

  const handleTagAdd = (newTag) =>
    setTags((prevState) => [...prevState, newTag]);
  const handleTagRemove = (tagToRemove) =>
    setTags(tags.filter((tag) => tag !== tagToRemove));

  return (
    <>
      <PageHead
        title="Manage Event"
        description={`Here you can manage your ${PROJECT_NAME} event`}
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
                    <Textarea
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
                      label={`Start Date${getTz(startDate)}`}
                      onChange={(e) => setStartDate(e.target.value)}
                      value={startDate}
                      max={endDate}
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
                      label={`End Date${getTz(endDate)}`}
                      onChange={(e) => setEndDate(e.target.value)}
                      value={endDate}
                      min={startDate}
                      required
                    />
                    <p className="text-sm text-primary-low-medium">
                      For example: In <i>DD / MM / YYYY, HH:MM</i>
                    </p>
                  </div>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <Toggle
                      text1="Are you speaking?"
                      enabled={isSpeaking}
                      setEnabled={setIsSpeaking}
                    />
                  </div>
                  {isSpeaking && (
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <Input
                        type="text"
                        name="topic"
                        label="What topic are you speaking on ?"
                        placeholder="Your speaking topic"
                        onChange={(e) => setspeakingTopic(e.target.value)}
                        value={speakingTopic}
                        required
                        maxLength="256"
                      />
                      <p className="text-sm text-primary-low-medium">
                        For example: <i>The future of AI</i>
                      </p>
                    </div>
                  )}
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <Input
                      type="number"
                      min="0"
                      name="price"
                      label="Ticket Price ($)"
                      onChange={(e) => setPrice(parseInt(e.target.value))}
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
                      type="color"
                      name="color"
                      label="Color"
                      onChange={(e) => setColor(e.target.value)}
                      value={color}
                      minLength="2"
                      maxLength="16"
                    />
                  </div>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <TagsInput
                      onTagAdd={handleTagAdd}
                      onTagRemove={handleTagRemove}
                      tags={tags}
                    />
                    <p className="text-sm text-primary-medium-low dark:text-primary-low-high">
                      Separate tags with commas.
                    </p>
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
          <div className="mt-6 md:mt-0">
            <EventCard
              event={{
                name,
                description,
                url,
                date: { start: startDate, end: endDate },
                isVirtual,
                isSpeaking,
                speakingTopic,
                price: { startingFrom: price },
                color,
                tags,
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
