import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { abbreviateNumber } from "js-abbreviation-number";
import { IconContext } from "react-icons";
import {
  MdArrowUpward,
  MdHelpOutline,
  MdOutlineLink,
  MdOutlinePersonPin,
  MdOutlineAutoGraph,
  MdOutlineEditCalendar,
} from "react-icons/md";
import { FaUsers, FaMedal } from "react-icons/fa";

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
  const features = [
    {
      name: "Links",
      description: "Let people discover all your great content in one place",
      icon: MdOutlineLink,
      path: "/docs/how-to-guides/links",
    },
    {
      name: "Bio",
      description:
        "Encourage people to find out more about you and what you do",
      icon: MdOutlinePersonPin,
      path: "/docs/how-to-guides/bio",
    },
    {
      name: "Statistics",
      description: "Learn which of your links and content performs best",
      icon: MdOutlineAutoGraph,
      path: "/docs/how-to-guides/statistics",
    },
    {
      name: "Events",
      description:
        "Hosting or attending events, let people know what you are up to",
      icon: MdOutlineEditCalendar,
      path: "/docs/how-to-guides/events",
    },
    {
      name: "Milestones",
      description:
        "Demostrate the highlights of your career by adding Milestones to your Profile",
      icon: FaMedal,
      path: "/docs/how-to-guides/milestones",
    },
    {
      name: "Testimonials",
      description: "Show off the great feedback you have received",
      icon: FaUsers,
      path: "/docs/how-to-guides/testimonials",
    },
  ];

  return (
    <>
      <Head>
        <title>LinkFree - connect to your audience with a single link</title>
        <meta
          name="description"
          content="Open Source alternative to LinkTree"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="bg-gray-50 mb-8 p-8 drop-shadow-md">
          <h2 className="tracking-tight sm:tracking-tight flex sm:flex-row items-center justify-between flex-col">
            <span className="text-4xl font-bold text-indigo-600">LinkFree</span>
            <span className="text-2xl text-gray-500">100% Open Source</span>
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

        <div className="bg-white">
          <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-lg bg-indigo-700 shadow-xl lg:grid lg:grid-cols-2 lg:gap-4">
              <div className="px-6 pt-10 pb-12 sm:px-16 sm:pt-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
                <div className="lg:self-center">
                  <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    <span className="block">Connect to your audience</span>
                    <span className="block">with a single link</span>
                  </h2>
                  <p className="mt-4 text-lg leading-6 text-indigo-200">
                    Showcase the content you create and your projects in one
                    place. Make it easier for people to find, follow and
                    subscribe.
                  </p>
                </div>
              </div>
              <div className="aspect-w-5 aspect-h-3 -mt-6 md:aspect-w-2 md:aspect-h-1">
                <Image
                  className="translate-x-6 translate-y-6 transform rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20"
                  src="/mockup.png"
                  alt="App screenshot"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50">
          <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              <span className="block">Ready to dive in?</span>
              <span className="block text-indigo-600">
                Add your free profile today!
              </span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <Link
                  href="/docs/quickstart"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700"
                >
                  Get started
                </Link>
              </div>
              <div className="ml-3 inline-flex rounded-md shadow">
                <Link
                  href="/eddiejaoude"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-indigo-600 hover:bg-indigo-50"
                >
                  Example
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="relative bg-white py-24 sm:py-32 lg:py-40">
          <div className="mx-auto max-w-md px-6 text-center sm:max-w-3xl lg:max-w-7xl lg:px-8">
            <h2 className="text-lg font-semibold text-indigo-600">
              Main Features
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              It is not just links...
            </p>
            <p className="mx-auto mt-5 max-w-prose text-xl text-gray-500">
              In addition to links to your favourite social media accounts, you
              can also add a variety of features to make a complete profile, all
              in one place.
            </p>
            <div className="mt-20">
              <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((feature) => (
                  <div key={feature.name} className="pt-6">
                    <div className="flow-root rounded-lg bg-gray-50 px-6 pb-8">
                      <div className="-mt-6">
                        <div>
                          <span className="inline-flex items-center justify-center rounded-xl bg-indigo-500 p-3 shadow-lg">
                            <feature.icon
                              className="h-8 w-8 text-white"
                              aria-hidden="true"
                            />
                          </span>
                        </div>
                        <Link href={feature.path}>
                          <h3 className="mt-8 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                            {feature.name}
                          </h3>
                        </Link>
                        <p className="mt-5 text-base leading-7 text-gray-600">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Link
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
        </Link>
      </main>
    </>
  );
}
