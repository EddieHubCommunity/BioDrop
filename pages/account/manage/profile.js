// 1. profile
// add manage link to navbar

// 2. extras
// form links + socials
// form tags
// form milestones
// form testimonials
// form events

import { authOptions } from "../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useState } from "react";

import logger from "@config/logger";
import PageHead from "@components/PageHead";
import Page from "@components/Page";
import Link from "@components/Link";
import Alert from "@components/Alert";
import FallbackImage from "@components/FallbackImage";

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
    const resUser = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${username}`
    );
    profile = await resUser.json();
  } catch (e) {
    logger.error(e, `profile loading failed for username: ${username}`);
  }

  if (profile.error) {
    profile.username = username;
    profile.name = session.user.name;
  }

  return {
    props: { profile, BASE_URL: process.env.NEXT_PUBLIC_BASE_URL },
  };
}

export default function Profile({ BASE_URL, profile }) {
  const [source, setSource] = useState(profile.sources.current || "database");
  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${BASE_URL}/api/account/manage/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ source, name, bio }),
    });
    const data = await res.json();
  };

  return (
    <>
      <PageHead
        title="Manage Profile"
        description="Here you can manage your LinkFree profile"
      />

      <Page>
        {profile.sources.available.includes("file") && (
          <Alert
            type="warning"
            message={`"${profile.username}.json" found also exists, please remove this file via a Pull Request if you will be managing your account via these forms`}
          />
        )}
        <form
          className="space-y-8 divide-y divide-gray-200"
          onSubmit={handleSubmit}
        >
          <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
            <div className="space-y-6 sm:space-y-5">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Your LinkFree Profile
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  This information will be displayed publicly on{" "}
                  <Link
                    href={`${BASE_URL}/${profile.username}`}
                  >{`${BASE_URL}/${profile.username}`}</Link>
                </p>
              </div>

              <div className="space-y-6 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Username
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <div className="flex max-w-lg rounded-md shadow-sm">
                      <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-100 px-3 text-gray-500 sm:text-sm">
                        {BASE_URL}
                      </span>
                      <input
                        type="text"
                        name="username"
                        id="username"
                        autoComplete="username"
                        disabled={true}
                        value={profile.username}
                        className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-100 px-3 text-gray-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 sm:pt-5 sm:border-t sm:border-gray-200">
                <div role="group" aria-labelledby="label-notifications">
                  <div className="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4">
                    <div>
                      <div
                        className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700"
                        id="label-notifications"
                      >
                        Load profile
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <div className="max-w-lg">
                        <label
                          htmlFor="location"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Location (note: profile can only be loaded from 1
                          place)
                        </label>
                        <select
                          id="source"
                          name="source"
                          className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          defaultValue={profile.sources.current || "database"}
                          onChange={(e) => setSource(e.target.value)}
                        >
                          <option>file</option>
                          <option>database</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Name
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Photo
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <div className="flex items-center">
                    <span className="h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                      <FallbackImage
                        src={`https://github.com/${profile.username}.png`}
                        width="100"
                        height="100"
                        alt={`Profile picture for GitHub user "${profile.username}"`}
                      />
                    </span>
                  </div>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  About
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    defaultValue={profile.bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Write a few sentences about yourself. You can use markdown.
                  </p>

                  <div className="border border-gray-300 p-4 mt-4 rounded-md">
                    <ReactMarkdown>{bio}</ReactMarkdown>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Preview of your bio with rendered markdown.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </Page>
    </>
  );
}
