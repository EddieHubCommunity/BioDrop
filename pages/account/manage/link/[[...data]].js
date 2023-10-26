import Router from "next/router";
import { useState } from "react";
import { authOptions } from "../../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import { clientEnv } from "@config/schemas/clientSchema";
import logger from "@config/logger";
import PageHead from "@components/PageHead";
import Page from "@components/Page";
import Button from "@components/Button";
import Navigation from "@components/account/manage/Navigation";
import { getLinkApi } from "pages/api/account/manage/link/[[...data]]";
import Input from "@components/form/Input";
import UserLink from "@components/user/UserLink";
import Toggle from "@components/form/Toggle";
import Notification from "@components/Notification";
import Link from "@components/Link";
import ConfirmDialog from "@components/ConfirmDialog";
import { PROJECT_NAME } from "@constants/index";
import IconSearch from "@components/IconSearch";
import Select from "@components/form/Select";
import config from "@config/app.json";
import { objectToLabelValueArray } from "@services/utils/objectToLabelValueArray";

const animations = config.animations;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const username = session.username;
  const id = context.query.data ? context.query.data[0] : undefined;

  let link = {};
  if (id) {
    try {
      link = await getLinkApi(username, id);
    } catch (e) {
      logger.error(e, `link ${id} failed for username: ${username}`);
    }
  }

  return {
    props: { username, link, BASE_URL: clientEnv.NEXT_PUBLIC_BASE_URL },
  };
}

export default function ManageLink({ BASE_URL, username, link }) {
  const [open, setOpen] = useState(false);
  const [showNotification, setShowNotification] = useState({
    show: false,
    type: "",
    message: "",
    additionalMessage: "",
  });
  const [edit, setEdit] = useState(link._id ? true : false);
  const [group, setGroup] = useState(link.group || "");
  const [name, setName] = useState(link.name || "");
  const [url, setUrl] = useState(link.url || "");
  const [icon, setIcon] = useState(link.icon || "");
  const [isEnabled, setIsEnabled] = useState(link.isEnabled ? true : false);
  const [isPinned, setIsPinned] = useState(link.isPinned ? true : false);
  const [animation, setAnimation] = useState(
    link.animation || Object.keys(config.animations)[0],
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    let method = "POST";
    let selectedIcon = icon !== "" ? icon : "FaGlobe";
    let putLink = {
      group,
      name,
      url,
      icon: selectedIcon,
      isEnabled,
      isPinned,
      animation,
    };

    let alert = "created";
    let apiUrl = `${BASE_URL}/api/account/manage/link`;
    if (edit) {
      alert = "updated";
      method = "PUT";
      putLink = { ...putLink, _id: link._id };
      apiUrl = `${BASE_URL}/api/account/manage/link/${link._id}`;
    }

    const res = await fetch(apiUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(putLink),
    });
    const update = await res.json();

    if (update.message || !update) {
      return setShowNotification({
        show: true,
        type: "error",
        message: "Link add/update failed",
        additionalMessage: `Please check the fields: ${Object.keys(
          update.message,
        ).join(", ")}`,
      });
    }

    setEdit(true);
    Router.push(`${BASE_URL}/account/manage/links?alert=${alert}`);
  };

  const deleteItem = async () => {
    const res = await fetch(`${BASE_URL}/api/account/manage/link/${link._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const update = await res.json();

    if (update.error || update.message) {
      return setShowNotification({
        show: true,
        type: "error",
        message: "Link delete failed",
        additionalMessage: update.error || update.message,
      });
    }

    return Router.push(`${BASE_URL}/account/manage/links?alert=deleted`);
  };

  return (
    <>
      <PageHead
        title="Manage Links"
        description={`Here you can manage your ${PROJECT_NAME} links`}
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
                    What Links would you like to appear on your Profile?
                  </h3>
                  {/* <p className="mt-1 max-w-2xl text-sm text-primary-low-medium">
                    Tip: promote a link to under your name by using the "pin"
                    toggle
                  </p> */}
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-primary-low-medium/30 sm:pt-5">
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <Input
                      name="group"
                      label="Group"
                      onChange={(e) => setGroup(e.target.value)}
                      value={group}
                      minLength="2"
                      maxLength="64"
                    />
                    <p className="text-sm text-primary-low-medium">
                      You can{" "}
                      <Link
                        href="/docs/how-to-guides/links-forms"
                        target="_blank"
                      >
                        group
                      </Link>{" "}
                      your links together (optional)
                    </p>
                  </div>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <Input
                      type="url"
                      name="url"
                      label="URL"
                      onChange={(e) => setUrl(e.target.value)}
                      value={url}
                      disabled={edit}
                      readOnly={edit}
                      required
                      minLength="2"
                      maxLength="256"
                    />
                    <p className="text-sm text-primary-low-medium">
                      For example: <i>https://twitter.com/eddiejaoude</i>
                    </p>
                  </div>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <Input
                      name="name"
                      label="Display Name"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      required
                      minLength="2"
                      maxLength="128"
                    />
                    <p className="text-sm text-primary-low-medium">
                      For example: <i>Follow me on Twitter</i>
                    </p>
                  </div>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <IconSearch
                      handleSelectedIcon={setIcon}
                      selectedIcon={icon}
                    />
                    <p className="text-sm text-primary-low-medium">
                      Search for available{" "}
                      <Link href="/icons" target="_blank">
                        Icons
                      </Link>
                    </p>
                  </div>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <Select
                      name="animation"
                      label="Animation"
                      value={animation}
                      options={objectToLabelValueArray(animations)}
                      onChange={(e) => setAnimation(e.target.value)}
                    />
                  </div>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <Toggle
                      text1="Enable?"
                      text2="hide/show link on profile"
                      enabled={isEnabled}
                      setEnabled={setIsEnabled}
                    />
                  </div>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <Toggle
                      text1="Pinned?"
                      text2="Display at the top of your profile"
                      enabled={isPinned}
                      setEnabled={setIsPinned}
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  {link._id && (
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
            {group && (
              <h3 className="ml-2 mt-2 text-lg font-medium leading-6 dark:text-primary-low text-primary-high">
                {group}
              </h3>
            )}
            <UserLink
              BASE_URL={BASE_URL}
              link={{ name, url, icon, animation }}
              username={username}
            />
          </div>
        </div>
      </Page>
      <ConfirmDialog
        open={open}
        action={deleteItem}
        setOpen={setOpen}
        title="Delete link"
        description="Are you sure?"
      />
    </>
  );
}
