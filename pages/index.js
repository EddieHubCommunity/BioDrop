import Head from "next/head";
import Link from "../components/Link";
import Image from "next/image";
import { IconContext } from "react-icons";
import {
  MdOutlinePlayArrow,
  MdArrowUpward,
  MdHelpOutline,
  MdOutlineLink,
  MdOutlinePersonPin,
  MdOutlineAutoGraph,
  MdOutlineEditCalendar,
} from "react-icons/md";
import { FaMedal } from "react-icons/fa";

import singleUser from "../config/user.json";
import { abbreviateNumber } from "../services/utils/abbreviateNumbers";

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
      name: "QuickStart",
      description:
        "Learn how to add your basic LinkFree Profile within a few minutes",
      icon: MdOutlinePlayArrow,
      path: "/docs/quickstart",
    },
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
        "Demonstrate the highlights of your career by adding Milestones to your Profile",
      icon: FaMedal,
      path: "/docs/how-to-guides/milestones",
    },
  ];

  const featuresDetails = [
    {
      name: "Your Bio, Social links and Stats",
      description:
        "Let people easily discover you and your links to your social accounts and content. Find out how many times your Profile has been viewed and your links clicked.",
      imageSrc:
        "https://user-images.githubusercontent.com/624760/210063800-796e29dd-3557-43c8-b84c-6fe24f44925f.png",
      imageAlt:
        "LinkFree screenshot of the bio and social links in example profile",
    },
    {
      name: "Your Tags",
      description:
        "Make your Profile discoverable with tags that describe you.",
      imageSrc:
        "https://user-images.githubusercontent.com/100528412/210552842-70d6a823-5062-4ad9-aa51-78c990b72d63.png",
      imageAlt: "LinkFree screenshot of the tags in example profile",
    },
    {
      name: "Search by Tags",
      description:
        "Search Profiles not just by name also by tags. This is a great way to connect with people and grow your network.",
      imageSrc:
        "https://user-images.githubusercontent.com/624760/210064219-9df11665-a29c-4aef-b0d8-7d163c9401e2.png",
      imageAlt:
        "LinkFree screenshot of search page using tags for searching profiles.",
    },
    {
      name: "Your QR code",
      description:
        "Make it easier to share your Profile when you meet people with your unique QR code.",
      imageSrc:
        "https://user-images.githubusercontent.com/100528412/211307797-e7ae2d78-f7e2-48c5-a4d2-910bcb69a8e5.png",
      imageAlt:
        "White canvas laptop sleeve with gray felt interior, silver zipper, and tan leather zipper pull.",
    },
    {
      name: "Your Links",
      description:
        "Let people discover all your great content in one place by adding links to your different socials, website, blog ... and more.",
      imageSrc:
        "https://user-images.githubusercontent.com/624760/210063791-91499fe2-3f30-4333-9623-78d5075a3d79.png",
      imageAlt:
        "White canvas laptop sleeve with gray felt interior, silver zipper, and tan leather zipper pull.",
    },
    {
      name: "Your Milestones",
      description:
        "Demonstrate the highlights of your career by adding Milestones to your Profile",
      imageSrc:
        "https://user-images.githubusercontent.com/624760/210063788-3c496c46-78e8-49f1-a633-b2c34536fcc4.png",
      imageAlt:
        "White canvas laptop sleeve with gray felt interior, silver zipper, and tan leather zipper pull.",
    },
    {
      name: "Your Testimonials",
      description: "Show off the great feedback you have received.",
      imageSrc:
        "https://user-images.githubusercontent.com/624760/210063784-ae8dab1f-3f1e-41cc-83a5-94e69ee9e7ff.png",
      imageAlt:
        "White canvas laptop sleeve with gray felt interior, silver zipper, and tan leather zipper pull.",
    },
    {
      name: "Your Events",
      description:
        "Hosting or attending events, let people know what you are up to.",
      imageSrc:
        "https://user-images.githubusercontent.com/624760/210063782-3e6ed687-7d1b-4a23-bd02-aa88968ad0ec.png",
      imageAlt:
        "White canvas laptop sleeve with gray felt interior, silver zipper, and tan leather zipper pull.",
    },
    {
      name: "Community Events",
      description:
        "Upcoming events from the community Profiles will be displayed on this page also.",
      imageSrc:
        "https://user-images.githubusercontent.com/624760/210064225-b792c186-1eb0-4451-8624-39d5d33724b1.png",
      imageAlt:
        "White canvas laptop sleeve with gray felt interior, silver zipper, and tan leather zipper pull.",
    },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

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
        <div className="grid place-content-center place-items-center text-center  gap-2 px-3 h-full py-20 md:py-32 lg:py-52">
          <span className="bg-gray-200 border border-solid text-slate-700 uppercase border-gray-400 px-10 leading-loose py-1 rounded-full font-helix-bold">
            100% <span className="pl-1">Opensource</span>
          </span>
          <h1 className="text-3xl md:text-4xl xl:text-6xl font-helix text-slate-900 leading-snug md:leading-tight xl:leading-tight ">
            Connect to your audience
            <br className="md:block hidden" aria-hidden /> with a{" "}
            <strong className="text-indigo-600 font-helix-bold">
              single link
            </strong>
          </h1>
          <p className=" mt-2 md:mt-6   text-xl font-helix  text-slate-900 text-opacity-80 max-w-screen-sm  leading-snug ">
            Showcase the content you create and your projects in one place. Make
            it easier for people to find, follow and subscribe.
          </p>
          <div className="flex  flex-nowrap gap-3 mt-5">
            <Link
              href="/docs/quickstart"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 font-helix text-lg text-white hover:bg-indigo-700"
            >
              Get started
            </Link>
            <Link
              href="/eddiejaoude"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3  font-medium text-indigo-600 font-helix text-lg hover:bg-indigo-50"
            >
              Example
            </Link>
          </div>
        </div>

        <div className="pb-20 lg:pb-28">
          <dl class="mt-5 grid grid-cols-1  sm:grid-cols-3 max-w-screen-xl  mx-auto divide-x divide-gray-100 ">
            {total.users > 0 && (
              <div class="overflow-hidden rounded-lg bg-white px-4 py-5  sm:py-6 md:px-10 ">
                <dd class="mt-1 flex items-baseline justify-between md:block lg:flex">
                  <div class="flex flex-col  gap-3 items-baseline text-2xl font-semibold ">
                    <span className="font-helix-bold text-5xl text-indigo-600">
                      {abbreviateNumber(total.active)}
                    </span>
                    <span className="text-xl text-gray-600 font-helix">
                      Active Users
                    </span>
                  </div>
                </dd>
              </div>
            )}

            {total.views > 0 && (
              <div class="overflow-hidden rounded-lg bg-white px-4 py-5  sm:py-6 md:px-10 ">
                <dd class="mt-1 flex items-baseline justify-between md:block lg:flex">
                  <div class="flex flex-col  gap-3 items-baseline text-2xl font-semibold ">
                    <span className="font-helix-bold text-5xl text-indigo-600">
                      {abbreviateNumber(total.views)}
                    </span>
                    <span className="text-xl text-gray-600 font-helix">
                      Profile views
                    </span>
                  </div>
                </dd>
              </div>
            )}
            {total.clicks > 0 && (
              <div class="overflow-hidden rounded-lg bg-white px-4 py-5  sm:py-6 md:px-10 ">
                <dd class="mt-1 flex items-baseline justify-between md:block lg:flex">
                  <div class="flex flex-col  gap-3 items-baseline text-2xl font-semibold ">
                    <span className="font-helix-bold text-5xl text-indigo-600">
                      {abbreviateNumber(total.clicks)}
                    </span>
                    <span className="text-xl text-gray-600 font-helix">
                      Links clicked
                    </span>
                  </div>
                </dd>
              </div>
            )}
          </dl>
        </div>

        <div>
          <div className="bg-indigo-700 text-white  py-10 md:py-16 ">
            <div className="mx-auto max-w-2xl py-12 px-4 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
              <div className="mx-auto max-w-3xl text-center pb-10 md:pb-16">
                <h2 className="mt-2 leading-tight  font-bold tracking-tight text-3xl lg:leading-tight  lg:text-4xl font-helix-bold">
                  Features
                </h2>

                <p className="mt-4 text-white font-helix  text-lg ">
                  It is not just links... Take a look at the Features
                  <br className="md:block hidden" /> you can add to customise
                  your LinkFree Profile.
                </p>
              </div>

              <div className="mt-20 space-y-32">
                {featuresDetails.map((feature, featureIdx) => (
                  <div
                    key={feature.name}
                    className="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8"
                  >
                    <div
                      className={classNames(
                        featureIdx % 2 === 0
                          ? "lg:col-start-1"
                          : "lg:col-start-8 xl:col-start-8",
                        "mt-6  lg:mt-0 lg:row-start-1 lg:col-span-5 md:px-10 xl:col-span-5 grid  gap-4"
                      )}
                    >
                      <h3 className="mt-2 leading-tight font-bold tracking-tight  text-2xl lg:leading-tight  lg:text-3xl font-helix-bold">
                        {feature.name}
                      </h3>
                      <p className="  text-base text-white md:text-lg font-helix max-w-[300px]  leading-snug md:leading-snug">
                        {feature.description}
                      </p>
                    </div>
                    <div
                      className={classNames(
                        featureIdx % 2 === 0
                          ? "lg:col-start-8 xl:col-start-6"
                          : "lg:col-start-1",
                        "flex-auto lg:row-start-1  lg:col-span-6 xl:col-span-7"
                      )}
                    >
                      <div className="min-h-[300px] grid place-content-center overflow-hidden rounded-lg bg-gray-100">
                        <Image
                          src={feature.imageSrc}
                          alt={feature.imageAlt}
                          className=" h-full w-full object-cover object-center"
                          width={1250}
                          height={840}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative bg-white py-24 sm:py-32 lg:py-40">
          <div className="mx-auto max-w-md px-6 text-center sm:max-w-3xl lg:max-w-7xl lg:px-8">
            <span className=" text-base md:text-lg font-helix font-semibold text-indigo-600">
              Want to get started
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-helix-bold">
              Popular User Guides
            </h2>
            <p className="mx-auto mt-5 max-w-prose text-xl text-gray-500 font-helix">
              Here is a selection of our popular
              <br className="md:block hidden" /> documentation guides to help
              you get started.
            </p>
            <div className=" pt-10 md:mt-16 lg:mt-20">
              <div className=" max-w-screen-xl  mx-auto grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((feature) => (
                  <div key={feature.name} className="pt-6">
                    <div className="flow-root h-full rounded-lxl  bg-gray-50 px-10 pb-12">
                      <div className="-mt-6">
                        <div>
                          <span className="inline-flex  items-center justify-center  h-20 w-20 rounded-full bg-indigo-500 p-3 shadow-lg">
                            <feature.icon
                              className="h-10 w-auto object-contain object-center text-white"
                              aria-hidden="true"
                            />
                          </span>
                        </div>
                        <h3 className="mt-8   font-helix-bold text-2xl  text-slate-800 lg:text-3xl font-semibold leading-8 tracking-tight">
                          <Link
                            href={feature.path}
                            className="text-gray-900 hover:text-indigo-600 hover:underline"
                          >
                            {feature.name}
                          </Link>
                        </h3>
                        <p className="mt-5 text-base leading-7 text-gray-600 font-helix px-2 ">
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
      </main>
    </>
  );
}
/*



  
                  

*/

/*

 <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            
*/
