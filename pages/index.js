import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { abbreviateNumber } from "js-abbreviation-number";
import { IconContext } from "react-icons";
import { MdHelpOutline } from "react-icons/md";
import { MdArrowUpward } from "react-icons/md";

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

  let total = {};
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/statistics/totals`
    );
    total = await res.json();
  } catch (e) {
    console.log("ERROR total stats not found ", e);
  }

  let today = {};
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/statistics/today`
    );
    today = await res.json();
  } catch (e) {
    console.log("ERROR today stats not found ", e);
  }

  return {
    props: { total, today },
  };
}

export default function Home({ total, today }) {
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
        <div className="bg-gray-50 mb-8 p-8 drop-shadow-md">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:tracking-tight">
            <span className="block">
              Connects your audience with a single link
            </span>
            <span className="block text-indigo-600">100% Open Source</span>
          </h2>
          <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {total.users > 0 && (
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">
                  Users
                </dt>
                <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                  <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                    {abbreviateNumber(total.users)}
                  </div>
                </dd>
              </div>
            )}
            {total.views > 0 && (
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">
                  Profile views
                </dt>
                <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                  <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                    {abbreviateNumber(total.views)}
                    <span className="ml-2 text-sm font-medium text-gray-500">
                      from {abbreviateNumber(total.views - today.views)}
                    </span>
                  </div>

                  <div className="bg-green-100 text-green-800 inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0">
                    <MdArrowUpward
                      className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
                      aria-hidden="true"
                    />

                    <span className="sr-only">Increased by </span>
                    {abbreviateNumber(today.views)}
                  </div>
                </dd>
              </div>
            )}
            {total.clicks > 0 && (
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">
                  Links clicked
                </dt>
                <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                  <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                    {abbreviateNumber(total.clicks)}
                    <span className="ml-2 text-sm font-medium text-gray-500">
                      from {abbreviateNumber(total.clicks - today.clicks)}
                    </span>
                  </div>

                  <div className="bg-green-100 text-green-800 inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0">
                    <MdArrowUpward
                      className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
                      aria-hidden="true"
                    />

                    <span className="sr-only">Increased by </span>
                    {abbreviateNumber(today.clicks)}
                  </div>
                </dd>
              </div>
            )}
          </dl>
        </div>

        <p className="text-2xl font-normal text-center mb-6">
          <b>LinkFree</b> is an open-source alternative to Linktree implemented
          in JavaScript
        </p>

        <p className="text-1xl text-center">
          See{" "}
          <Link
            href={{
              pathname: "/[username]",
              query: { username: "eddiejaoude" },
            }}
            legacyBehavior
          >
            <span className="text-cyan-600 cursor-pointer">
              Eddie Jaoude&apos;s
            </span>
          </Link>{" "}
          profile for an example. Want to add your profile? Read the{" "}
          <Link href="/docs" legacyBehavior>
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
        <a
          href="https://github.com/EddieHubCommunity/LinkFree/discussions"
          rel="noopener noreferrer"
          target="_blank"
        >
          <div className="fixed bottom-5 right-5 p-2 bg-indigo-600 text-white flex items-center gap-1 rounded-full hover:drop-shadow-lg">
            <IconContext.Provider
              value={{ color: "white", style: { verticalAlign: "middle" } }}
            >
              <MdHelpOutline />
            </IconContext.Provider>
            <p className="text-sm font-medium">Help</p>
          </div>
        </a>
      </main>
    </>
  );
}
