import { useState } from "react";
import { authOptions } from "../../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import logger from "@config/logger";
import PageHead from "@components/PageHead";
import Page from "@components/Page";
import Button from "@components/Button";
import Navigation from "@components/account/manage/navigation";
import { getLinkApi } from "pages/api/account/manage/link/[[...data]]";
import Input from "@components/form/Input";
import UserLink from "@components/user/UserLink";
import Toggle from "@components/form/Toggle";
import Notification from "@components/Notification";
import Link from "@components/Link";

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
  const url = context.query.data ? context.query.data[0] : undefined;
  let link = {};
  if (url) {
    try {
      link = await getLinkApi(username, url);
    } catch (e) {
      logger.error(e, `link ${url} failed for username: ${username}`);
    }
  }

  return {
    props: { username, link, BASE_URL: process.env.NEXT_PUBLIC_BASE_URL },
  };
}

export default function ManageLink({ BASE_URL, username, link }) {
  const [showNotification, setShowNotification] = useState(false);
  const [edit, setEdit] = useState(link._id ? true : false);
  const [group, setGroup] = useState(link.group);
  const [name, setName] = useState(link.name);
  const [url, setUrl] = useState(link.url);
  const [icon, setIcon] = useState(link.icon);
  const [isEnabled, setIsEnabled] = useState(link.isEnabled || true);
  const [isPinned, setIsPinned] = useState(link.isPinned);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `${BASE_URL}/api/account/manage/link/${encodeURIComponent(url)}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ group, name, url, icon, isEnabled, isPinned }),
      }
    );
    await res.json();
    setShowNotification(true);
  };

  return (
    <>
      <PageHead
        title="Manage Links"
        description="Here you can manage your LinkFree links"
      />

      <Page>
        <Navigation />

        <Notification
          show={showNotification}
          type="success"
          onClose={() => setShowNotification(false)}
          message="Link saved"
          additionalMessage="Your link information has been saved successfully."
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
                    What Links would you like to appear on your Profile?
                  </h3>
                  {/* <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Tip: promote a link to under your name by using the "pin"
                    toggle
                  </p> */}
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <Input
                      name="group"
                      label="Group"
                      onChange={(e) => setGroup(e.target.value)}
                      value={group}
                    />
                    <p className="text-sm text-gray-500">
                      You can{" "}
                      <Link
                        href="http://localhost:3000/docs/how-to-guides/links"
                        target="_blank"
                      >
                        group
                      </Link>{" "}
                      your links together (optional)
                    </p>
                  </div>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <Input
                      name="url"
                      label="URL"
                      onChange={(e) => setUrl(e.target.value)}
                      value={url}
                      disabled={edit}
                      readOnly={edit}
                    />
                    <p className="text-sm text-gray-500">
                      For example: <i>https://twitter.com/eddiejaoude</i>
                    </p>
                  </div>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <Input
                      name="name"
                      label="Display Name"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                    <p className="text-sm text-gray-500">
                      For example: <i>Follow me on Twitter</i>
                    </p>
                  </div>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <Input
                      name="icon"
                      label="Icon"
                      onChange={(e) => setIcon(e.target.value)}
                      value={icon}
                    />
                    <p className="text-sm text-gray-500">
                      Search for available{" "}
                      <Link href="/icons" target="_blank">
                        Icons
                      </Link>
                    </p>
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
                      text1="Pin?"
                      text2="Display at the top of your profile"
                      enabled={isPinned}
                      setEnabled={setIsPinned}
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
            <UserLink
              BASE_URL={BASE_URL}
              link={{ name, url, icon }}
              username={username}
            />
          </div>
        </div>
      </Page>
    </>
  );
}
