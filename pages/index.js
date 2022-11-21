import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { abbreviateNumber } from "js-abbreviation-number";

import app from "../config/app.json";
import singleUser from "../config/user.json";

export async function getServerSideProps(context) {
  if (singleUser.username) {
    return {
      redirect: {
        destination: `/${singleUser.username}`,
        permanent: true,
      },
    };
  }

  let data = {};
  try {
    const res = await fetch(`${app.baseUrl}/api/statistics/totals`);
    data = await res.json();
  } catch (e) {
    console.log("ERROR stats not found ", e);
  }

  return {
    props: { data },
  };
}

export default function Home({ data }) {
  return (
    <>
      <Head>
        <title>LinkFree</title>
        <meta
          name="description"
          content="Open Source alternative to LinkTree"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="bg-gray-50 mb-8 drop-shadow-md">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:tracking-tight">
              <span className="block">
                Connects your audience with a single link
              </span>
              <span className="block text-indigo-600">Open Source FTW</span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              {data.users > 0 && (
                <div className="inline-flex rounded-md drop-shadow-md">
                  <div className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-400">
                    {abbreviateNumber(data.users)} USERS
                  </div>
                </div>
              )}
              {data.views > 0 && (
                <div className="ml-3 inline-flex rounded-md drop-shadow-lg">
                  <div className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600">
                    {abbreviateNumber(data.views)} PROFILE VIEWS
                  </div>
                </div>
              )}
              {data.clicks > 0 && (
                <div className="ml-3 inline-flex rounded-md drop-shadow-xl">
                  <div className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-800">
                    {abbreviateNumber(data.clicks)} LINKS CLICKED
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <p className="text-2xl font-normal text-center mb-6">
          <b>LinkFree</b> is an open-source alternative to Linktree implemented in JavaScript
        </p>

        <p className="text-1xl text-center">
          See{" "}
          <Link href="/eddiejaoude" legacyBehavior>
            <span className="text-cyan-600 cursor-pointer">
              Eddie Jaoude&apos;s
            </span>
          </Link>{" "}
          profile for an example. Want to add your profile? Read the{" "}
          <Link
            href="https://github.com/EddieHubCommunity/LinkFree#-to-add-your-profile"
            legacyBehavior
          >
            <span className="text-cyan-600 cursor-pointer">instructions</span>
          </Link>
          .
        </p>
        <div className="grid place-items-center w-screen max-w-[100%]">
          <Image
            src="/mockup.png"
            alt="Mock up of LinkFree project"
            width="1200"
            height="638"
          />
        </div>
      </main>
    </>
  );
}

