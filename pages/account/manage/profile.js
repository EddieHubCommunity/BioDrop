import fs from "fs";
import path from "path";

import { authOptions } from "../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { useState } from "react";

import logger from "@config/logger";
import PageHead from "@components/PageHead";
import Page from "@components/Page";
import Alert from "@components/Alert";
import Navigation from "@components/account/manage/navigation";
import { getUserApi } from "pages/api/profiles/[username]";
import UserProfile from "@components/user/UserProfile";
import Input from "@components/form/Input";
import Select from "@components/form/Select";
import Button from "@components/Button";
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
  let profile = {};
  try {
    profile = (await getUserApi(context.req, context.res, username)).profile;
  } catch (e) {
    logger.error(e, `profile loading failed for username: ${username}`);
  }
  if (profile.error) {
    profile.username = session.username;
    profile.name = session.user.name;
  }

  const filePath = path.join(process.cwd(), "data", username);
  let fileExists;
  try {
    fs.readFileSync(`${filePath}.json`, "utf8");
    fileExists = true;
  } catch (e) {
    fileExists = false;
  }

  return {
    props: { profile, fileExists, BASE_URL: process.env.NEXT_PUBLIC_BASE_URL },
  };
}

export default function Profile({ BASE_URL, profile, fileExists }) {
  const [showNotification, setShowNotification] = useState(false);
  const [theme, setTheme] = useState(profile.theme || "original");
  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio);
  const [tags, setTags] = useState(profile.tags || []);
  const themes = ["original", "inline"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${BASE_URL}/api/account/manage/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, bio, tags, theme }),
    });
    await res.json();
    setShowNotification(true);
  };

  return (
    <>
      <PageHead
        title="Manage Profile"
        description="Here you can manage your LinkFree profile"
      />

      <Page>
        {fileExists && (
          <Alert
            type="warning"
            message={`"data/${profile.username}.json" also exists, please remove this file and your folder via a Pull Request now you will be managing your account via these forms`}
          />
        )}

        <Navigation />

        <Notification
          show={showNotification}
          type="success"
          onClose={() => setShowNotification(false)}
          message="Profile saved"
          additionalMessage="Your profile information has been saved successfully."
        />

        <div>
          <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8">
            <h1 className="sr-only">Profile information</h1>

            <section
              aria-labelledby="preview-data-heading"
              className="bg-gray-50 px-4 pb-10 pt-16 sm:px-6 lg:col-start-2 lg:row-start-1 lg:bg-transparent lg:px-0 lg:pb-16"
            >
              <div className="mx-auto max-w-lg lg:max-w-none">
                <UserProfile
                  BASE_URL={BASE_URL}
                  data={{ ...profile, name, bio, tags }}
                />
              </div>
            </section>

            <form
              className="px-4 pb-36 pt-16 sm:px-6 lg:col-start-1 lg:row-start-1 lg:px-0 lg:pb-16"
              onSubmit={handleSubmit}
            >
              <div className="mx-auto max-w-lg lg:max-w-none">
                <section aria-labelledby="uneditable-data-heading">
                  <div className="mt-1">
                    <Input
                      name="username"
                      label="Username"
                      value={profile.username}
                      disabled={true}
                      readOnly={true}
                    />
                  </div>
                </section>

                <section
                  aria-labelledby="editable-data-heading"
                  className="mt-10"
                >
                  <div className="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4">
                    <div className="col-span-3 sm:col-span-4">
                      <div className="mt-1">
                        <Select
                          name="theme"
                          label="Theme"
                          value={theme}
                          options={themes}
                          onChange={(e) => setTheme(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-span-3 sm:col-span-4">
                      <div className="mt-1">
                        <Input
                          name="name"
                          label="Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-span-3 sm:col-span-4">
                      <Input
                        name="bio"
                        label="Bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                      />
                    </div>

                    <div className="col-span-3 sm:col-span-4">
                      <Input
                        name="tags"
                        label="Tags"
                        value={tags}
                        onChange={(e) => setTags(e.target.value.split(","))}
                      />
                    </div>
                  </div>
                </section>

                <div className="mt-10 border-t border-gray-200 pt-6 sm:flex sm:items-center sm:justify-between">
                  <Button primary={true}>SAVE</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Page>
    </>
  );
}
