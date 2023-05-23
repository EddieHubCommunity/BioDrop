import Image from "next/image";
import { IconContext } from "react-icons";
import {
  MdOutlinePlayArrow,
  MdHelpOutline,
  MdOutlineLink,
  MdOutlinePersonPin,
  MdOutlineAutoGraph,
  MdOutlineEditCalendar,
} from "react-icons/md";
import { FaMedal } from "react-icons/fa";

import singleUser from "@config/user.json";
import { getTodayStats } from "./api/statistics/today";
import { getTotalStats } from "./api/statistics/totals";
import Link from "@components/Link";
import PageHead from "@components/PageHead";
import BasicCards from "@components/statistics/BasicCards";
import Button from "@components/Button";
import Testimonials from "@components/Testimonials";
import GitHubAccelerator from "@components/GitHubAccelerator";
import Alert from "@components/Alert";
import config from "@config/app.json";

export async function getStaticProps() {
  if (singleUser.username) {
    return {
      redirect: {
        destination: `/${singleUser.username}`,
        permanent: true,
      },
    };
  }

  const { stats: totalStats } = await getTotalStats();
  const { stats: todayStats } = await getTodayStats();

  return {
    props: { total: totalStats, today: todayStats },
    revalidate: 60 * 15, //15 minutes
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
        "https://user-images.githubusercontent.com/624760/217969141-08ba9803-6bd5-4f6e-89ab-03e04124c3c2.png",
      imageAlt:
        "LinkFree screenshot of the bio and social links in example profile",
    },
    {
      name: "Your Tags",
      description:
        "Make your Profile discoverable with tags that describe you.",
      imageSrc:
        "https://user-images.githubusercontent.com/84538727/215545233-86355c96-21d7-48f9-a641-6f0884f8098d.png",
      imageAlt: "LinkFree screenshot of the tags in example profile",
    },
    {
      name: "Search by Tags",
      description:
        "Search Profiles not just by name but also by tags. This is a great way to connect with people and grow your network.",
      imageSrc:
        "https://user-images.githubusercontent.com/83087385/234587034-baaf983f-1a91-4d2c-b28c-e9f4c9bb9509.png",
      imageAlt:
        "LinkFree screenshot of search page using tags for searching profiles.",
    },
    {
      name: "Your QR code",
      description:
        "Make it easier to share your Profile when you meet people with your unique QR code.",
      imageSrc:
        "https://user-images.githubusercontent.com/100528412/211307797-e7ae2d78-f7e2-48c5-a4d2-910bcb69a8e5.png",
      imageAlt: "LinkFree screenshot of a QR code example",
    },
    {
      name: "Your Links",
      description:
        "Let people discover all your great content in one place by adding links to your different socials, website, blog ... and more.",
      imageSrc:
        "https://user-images.githubusercontent.com/624760/217969126-c31be76a-6682-41a0-9fdf-8a235d1237f7.png",
      imageAlt: "LinkFree screenshot of links section of an example profile",
    },
    {
      name: "LinkFree Statistics",
      description:
        "View details of your LinkFree profile, with views and url clicks",
      imageSrc:
        "https://user-images.githubusercontent.com/109926117/234534981-9db096eb-dc79-4310-a7a6-e7fd46799dff.png",
      imageAlt: "LinkFree screenshot of account statistics page",
    },
    {
      name: "Your Milestones",
      description:
        "Demonstrate the highlights of your career by adding Milestones to your Profile.",
      imageSrc:
        "https://user-images.githubusercontent.com/624760/210063788-3c496c46-78e8-49f1-a633-b2c34536fcc4.png",
      imageAlt:
        "LinkFree screenshot of milestones section of an example profile",
    },
    {
      name: "Your Testimonials",
      description: "Show off the great feedback you have received.",
      imageSrc:
        "https://user-images.githubusercontent.com/624760/210063784-ae8dab1f-3f1e-41cc-83a5-94e69ee9e7ff.png",
      imageAlt:
        "LinkFree screenshot of testimonials section of an example profile",
    },
    {
      name: "Your Events",
      description:
        "Hosting or attending events, let people know what you are up to.",
      imageSrc:
        "https://user-images.githubusercontent.com/624760/210063782-3e6ed687-7d1b-4a23-bd02-aa88968ad0ec.png",
      imageAlt: "LinkFree screenshot of events section of an example profile",
    },
    {
      name: "Community Events",
      description:
        "Upcoming events from the community Profiles will be displayed on this page also.",
      imageSrc:
        "https://user-images.githubusercontent.com/109926117/234534986-ef4a6cd6-a22a-48f8-aa46-2dbd0f7a6403.png",
      imageAlt:
        "LinkFree screenshot of community events section in the Community Section tab",
    },
    {
      name: "LinkFree Map",
      description: "Discover people around the world from the LinkFree Map.",
      imageSrc:
        "https://user-images.githubusercontent.com/109926117/234534991-d2d3468e-2d13-4088-ad38-39f2d0cfa63d.png",
      imageAlt: "LinkFree screenshot of Map Page",
    },
  ];

  const testimonials = [
    {
      image: "https://github.com/FrancescoXX.png",
      name: "Francesco Ciulla",
      bio: "Developer Advocate at daily.dev, Docker Captain, Public Speaker, Community Builder",
      username: "FrancescoXX",
      text: "I had another similar (paid) service. I tried LinkFree for a week and  I got almost double the clicks on the links in the same period, redirecting from the same link. I decided to start using it regularly. I am very  satisfied. It's not just a list of links but it's backed by a great Open Source community",
    },
    {
      image: "https://github.com/amandamartin-dev.png",
      name: "Amanda Martin",
      bio: "Developer Advocate | Always Curious | Always Silly",
      username: "amandamartin-dev",
      text: "Where LinkFree really stands out is the ability to make meaningful connections and find collaborators due to thoughtful features that are not simply about chasing ways to build your audience. The fact that it's also Open Source really makes it the tool I was waiting for in this space.",
    },
    {
      image: "https://github.com/Pradumnasaraf.png",
      name: "Pradumna Saraf",
      bio: "Open Source Advocate | DevOps Engineer | EddieHub Ambassador",
      username: "Pradumnasaraf",
      text: "LinkFree is very close to me because I have seen it evolve. With LinkFree, I have discovered so many amazing people in tech. Some of my favorite features are the barcode for profiles and testimonials. If you are reading this and don't have a profile, I highly recommend doing that. Thank you, Eddie and EddieHub community, for building this incredible app.",
    },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <PageHead />

      <div className="bg-primary-low dark:drop-shadow-none dark:bg-primary-high mb-8 p-8 drop-shadow-md">
        {config.alerts.map((alert, index) => (
          <Alert key={index} type={alert.type} message={alert.message} />
        ))}

        <h2 className="tracking-tight sm:tracking-tight flex sm:flex-row items-center justify-between flex-col">
          <span className="text-4xl font-bold text-secondary-high dark:text-secondary-low">
            LinkFree
          </span>
          <span className="text-2xl dark:text-primary-low text-primary-medium">
            100% Open Source
          </span>
        </h2>
        <BasicCards
          data={[
            {
              name: "Active Users",
              current: total.active,
              total: total.users,
              delta: today.users,
            },
            {
              name: "Profile Views",
              current: total.views,
              total: total.views - today.views,
              delta: today.views,
            },
            {
              name: "Links Clicked",
              current: total.clicks,
              total: total.clicks - today.clicks,
              delta: today.clicks,
            },
          ]}
        />
      </div>

      <div className="bg-white dark:bg-primary-high">
        <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-lg bg-secondary-high shadow-xl lg:grid lg:grid-cols-2 lg:gap-4">
            <div className="px-6 pt-10 pb-12 sm:px-16 sm:pt-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
              <div className="lg:self-center">
                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  <span className="block">Connect to your audience</span>
                  <span className="block">with a single link</span>
                </h1>
                <p className="mt-4 text-lg leading-6 text-primary-low">
                  Showcase the content you create and your projects in one
                  place. Make it easier for people to find, follow and
                  subscribe.
                </p>
              </div>
            </div>
            <div className="aspect-w-5 aspect-h-3 -mt-6 md:aspect-w-2 md:aspect-h-1">
              <Image
                className="translate-x-6 translate-y-6 transform rounded-md object-cover object-left-top sm:translate-x-16 h-auto w-auto"
                src="https://user-images.githubusercontent.com/624760/230707268-1f8f1487-6524-4c89-aae2-ab45f0e17f39.png"
                priority
                alt="App screenshot"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-primary-low dark:bg-primary-high">
        <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-primary-high dark:text-primary-low sm:text-4xl">
            <span className="block">Ready to dive in?</span>
            <span className="block text-secondary-high dark:text-secondary-low">
              Add your free Profile today!
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Button
                text="Get started"
                href="/docs/quickstart"
                primary={true}
              />
            </div>
            <div className="ml-3 inline-flex rounded-md shadow ">
              <Button text="Example" href="/eddiejaoude" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-secondary-high">
        <div className="mx-auto max-w-2xl py-12 px-4 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Features
            </h2>
            <p className="mt-4 text-white">
              It is not just links... Take a look at the Features you can add to
              customize your LinkFree Profile.
            </p>
          </div>

          <div className="mt-16 space-y-16">
            {featuresDetails.map((feature, featureIdx) => (
              <div
                key={feature.name}
                className="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8"
              >
                <div
                  className={classNames(
                    featureIdx % 2 === 0
                      ? "lg:col-start-1"
                      : "lg:col-start-8 xl:col-start-9",
                    "mt-6 lg:mt-0 lg:row-start-1 lg:col-span-5 xl:col-span-4"
                  )}
                >
                  <h3 className="text-lg font-medium text-white">
                    {feature.name}
                  </h3>
                  <p className="mt-2 text-sm text-white">
                    {feature.description}
                  </p>
                </div>
                <div
                  className={classNames(
                    featureIdx % 2 === 0
                      ? "lg:col-start-6 xl:col-start-5"
                      : "lg:col-start-1",
                    "flex-auto lg:row-start-1 lg:col-span-7 xl:col-span-8"
                  )}
                >
                  <div className="aspect-w-5 aspect-h-2 overflow-hidden rounded-lg bg-primary-low">
                    <Image
                      src={feature.imageSrc}
                      alt={feature.imageAlt}
                      className="object-cover object-center"
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

      <div className="relative bg-white dark:bg-primary-high py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-md px-6 text-center sm:max-w-3xl lg:max-w-7xl lg:px-8">
          <h2 className="font-semibold text-secondary-high dark:text-secondary-low text-3xl">
            Getting Started
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-primary-high dark:text-primary-low sm:text-4xl">
            Popular User Guides
          </p>
          <p className="mx-auto mt-5 max-w-prose text-xl text-primary-medium dark:text-primary-low-high">
            Here is a selection of our popular documentation guides to help you
            get started.
          </p>
          <div className="mt-20">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="pt-6">
                  <Link
                    aria-label={`Go to ${feature.name} page`}
                    href={feature.path}
                    className="text-primary-high dark:text-primary-low-medium group"
                  >
                    <div className="flow-root rounded-lg bg-primary-low dark:bg-primary-medium px-6 pb-8">
                      <div className="-mt-6">
                        <div>
                          <span className="inline-flex items-center justify-center rounded-xl bg-secondary-high p-3 shadow-lg">
                            <feature.icon
                              className="h-8 w-8 text-white "
                              aria-hidden="true"
                            />
                          </span>
                        </div>
                        <h3 className="mt-8 text-lg font-semibold leading-8 tracking-tight group-hover:underline group-hover:text-secondary-medium dark:text-white">
                          {feature.name}
                        </h3>
                        <p className="mt-5 text-base leading-7 text-primary-high dark:text-primary-low-medium">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Testimonials data={testimonials} />

      <GitHubAccelerator />

      <Link
        href="https://github.com/EddieHubCommunity/LinkFree/discussions"
        rel="noopener noreferrer"
        target="_blank"
      >
        <div className="fixed bottom-5 right-5 px-4 py-2 bg-secondary-medium text-white flex items-center gap-1 rounded-full hover:drop-shadow-lg">
          <IconContext.Provider
            value={{ color: "white", style: { verticalAlign: "middle" } }}
          >
            <MdHelpOutline />
          </IconContext.Provider>
          <p className="text-sm font-medium">Help</p>
        </div>
      </Link>
    </>
  );
}
