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

export default function Link({ BASE_URL, username, link }) {
  const [edit, setEdit] = useState(link._id ? true : false);
  const [group, setGroup] = useState(link.group);
  const [name, setName] = useState(link.name);
  const [url, setUrl] = useState(link.url);
  const [icon, setIcon] = useState(link.icon);
  const [isEnabled, setIsEnabled] = useState(link.isEnabled);
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
    const data = await res.json();
  };

  return (
    <>
      <PageHead
        title="Manage Links"
        description="Here you can manage your LinkFree links"
      />

      <Page>
        <Navigation />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 xl:gap-x-48">
          <form
            className="space-y-8 divide-y divide-gray-200"
            onSubmit={handleSubmit}
          >
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
              <div className="space-y-6 sm:space-y-5">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    What links would you like to appear on your profile?
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Tip: promoted link to under your name
                  </p>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <Input
                      name="group"
                      label="Group"
                      onChange={(e) => setGroup(e.target.value)}
                      value={group}
                    />
                  </div>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <Input
                      name="url"
                      label="Url"
                      onChange={(e) => setUrl(e.target.value)}
                      value={url}
                      disabled={edit}
                      readOnly={edit}
                    />
                  </div>
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
                      name="icon"
                      label="Icon"
                      onChange={(e) => setIcon(e.target.value)}
                      value={icon}
                    />
                  </div>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <Toggle
                      text1="Enable?"
                      text2="disable/enable"
                      enabled={isEnabled}
                      setEnabled={setIsEnabled}
                    />
                  </div>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <Toggle
                      text1="Pin?"
                      text2="unpin/pin"
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
