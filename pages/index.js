import Image from "next/image";
import { IconContext } from "react-icons";
import { MdHelpOutline } from "react-icons/md";
import va from "@vercel/analytics";
import { FaDollarSign, FaGithub, FaLock } from "react-icons/fa6";

import config from "@config/app.json";
import { clientEnv } from "@config/schemas/clientSchema";
import { getTodayStats } from "./api/statistics/today";
import { getTotalStats } from "./api/statistics/totals";
import { getRandomProfileApi } from "./api/discover/random";
import { classNames } from "@services/utils/classNames";
import Link from "@components/Link";
import PageHead from "@components/PageHead";
import BasicCards from "@components/statistics/BasicCards";
import Testimonials from "@components/Testimonials";
import Alert from "@components/Alert";
import CallToAction from "@components/CallToAction";
import UserMini from "@components/user/UserMini";
import ThemedImage from "@components/ThemedImage";
import { serverEnv } from "@config/schemas/serverSchema";
import { PROJECT_NAME } from "@constants/index";
import Button from "@components/Button";

export async function getStaticProps() {
  const pageConfig = config.isr.homepage;

  const { stats: totalStats } = await getTotalStats();
  const { stats: todayStats } = await getTodayStats();
  const randomProfile = await getRandomProfileApi();

  let alerts = structuredClone(config.alerts);
  if (
    serverEnv.NEXT_PUBLIC_VERCEL_ENV !== "production" &&
    serverEnv.NODE_ENV === "development" &&
    totalStats.users === 0
  ) {
    alerts.push({
      type: "warning",
      message:
        'To (re)load json files and any changes, please visit "/api/system/reload?secret=development"',
    });
  }

  return {
    props: {
      BASE_URL: clientEnv.NEXT_PUBLIC_BASE_URL,
      total: totalStats,
      today: todayStats,
      randomProfile,
      alerts,
    },
    revalidate: pageConfig.revalidateSeconds,
  };
}

export default function Home({
  total,
  today,
  randomProfile,
  BASE_URL,
  alerts,
}) {
  const featuresDetails = [
    {
      name: "Your Bio, Social links and Stats",
      description:
        "Let people easily discover you and your links to your social accounts and content. Find out how many times your Profile has been viewed and your links clicked.",
      imageSrc:
        "https://user-images.githubusercontent.com/70514712/287446257-c893fa30-742d-4dd1-8cb1-3c0fd6ffd6c2.png",
      imageAlt:
        PROJECT_NAME +
        " screenshot of the bio and social links in example profile",
    },
    {
      name: "Search by Tags",
      description:
        "Search Profiles not just by name but also by tags. This is a great way to connect with people and grow your network.",
      imageSrc:
        "https://user-images.githubusercontent.com/73095526/285527203-ffe8b30a-c4e8-4f49-aaca-f63e0097e65d.png",
      imageAlt:
        PROJECT_NAME +
        " screenshot of search page using tags for searching profiles.",
    },
    {
      name: "QR code",
      description:
        "Make it easier to share your Profile when you meet people with your unique QR code.",
      imageSrc:
        "https://user-images.githubusercontent.com/100528412/211307797-e7ae2d78-f7e2-48c5-a4d2-910bcb69a8e5.png",
      imageAlt: PROJECT_NAME + " screenshot of a QR code example",
    },
    {
      name: "Statistics / Reporting",
      description: `View details of your ${PROJECT_NAME} profile, with views, url clicks, referrer, geo location and daily link clicks.`,
      imageSrc:
        "https://user-images.githubusercontent.com/109926117/234534981-9db096eb-dc79-4310-a7a6-e7fd46799dff.png",
      imageAlt: PROJECT_NAME + " screenshot of account statistics page",
    },
    {
      name: "Milestones",
      description:
        "Demonstrate the highlights of your career by adding Milestones to your Profile.",
      imageSrc:
        "https://user-images.githubusercontent.com/624760/210063788-3c496c46-78e8-49f1-a633-b2c34536fcc4.png",
      imageAlt:
        PROJECT_NAME +
        " screenshot of milestones section of an example profile",
    },
    {
      name: "Events",
      description:
        "Add your Events to your Profile and see all events added by BioDrop users to a Community events page.",
      imageSrc:
        "https://user-images.githubusercontent.com/109926117/234534986-ef4a6cd6-a22a-48f8-aa46-2dbd0f7a6403.png",
      imageAlt:
        PROJECT_NAME +
        " screenshot of community events section in the Community Section tab",
    },
    {
      name: "User Map",
      description: "Discover people around the World from the BioDrop Map.",
      imageSrc:
        "https://user-images.githubusercontent.com/43419831/279958647-a815844e-ca8e-48e1-8362-5cc1f48063d6.png",
      imageAlt: PROJECT_NAME + " screenshot of Map Page",
    },
    {
      name: "GitHub Repositories (repos)",
      description:
        "Add your GitHub repos to your Profile and they will also appear on the Community Repos page.",
      imageSrc:
        "https://user-images.githubusercontent.com/624760/263394464-1f60752c-00d2-4e41-bf74-fe598b14e9fa.png",
      imageAlt: "BioDrop screenshot of Repo Page",
    },
  ];

  const testimonials = [
    {
      image: "https://github.com/FrancescoXX.png",
      name: "Francesco Ciulla",
      bio: "Developer Advocate at daily.dev, Docker Captain, Public Speaker, Community Builder",
      username: "FrancescoXX",
      text: `I had another similar (paid) service. I tried ${PROJECT_NAME} for a week and  I got almost double the clicks on the links in the same period, redirecting from the same link. I decided to start using it regularly. I am very  satisfied. It's not just a list of links but it's backed by a great Open Source community`,
    },
    {
      image: "https://github.com/amandamartin-dev.png",
      name: "Amanda Martin",
      bio: "Developer Advocate | Always Curious | Always Silly",
      username: "amandamartin-dev",
      text: `Where ${PROJECT_NAME} really stands out is the ability to make meaningful connections and find collaborators due to thoughtful features that are not simply about chasing ways to build your audience. The fact that it's also Open Source really makes it the tool I was waiting for in this space.`,
    },
    {
      image: "https://github.com/Pradumnasaraf.png",
      name: "Pradumna Saraf",
      bio: "Developer Advocate 🥑 | DevOps | Golang Developer | EddieHub Ambassador",
      username: "Pradumnasaraf",
      text:
        PROJECT_NAME +
        " is very close to me because I have seen it evolve. With BioDrop, I have discovered so many amazing people in tech. Some of my favorite features are the barcode for profiles and testimonials. If you are reading this and don't have a profile, I highly recommend doing that. Thank you, Eddie and EddieHub community, for building this incredible app.",
    },
  ];

  return (
    <>
      <PageHead />

      {alerts.map((alert, index) => (
        <Alert key={index} type={alert.type} message={alert.message} />
      ))}

      <div className="bg-primary-low dark:bg-dark-2">
        <div className="px-6 py-12 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary-medium dark:text-primary-low sm:text-4xl">
              Connect to your audience with a{" "}
              <span className="text-tertiary-medium">single link</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-medium dark:text-primary-low mb-4">
              Showcase the content you create and your projects in one place
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 justify-center items-center divide-x-0 sm:divide-x divide-dark-2 dark:divide-primary-low">
              <div className="flex items-center gap-x-2 px-4">
                <FaGithub /> Open Source
              </div>
              <div className="flex items-center gap-x-2 px-4">
                <FaLock /> GitHub OAuth
              </div>
              <div className="flex items-center gap-x-2 px-4">
                <FaDollarSign /> Free Tier Forever
              </div>
            </div>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 sm:mx-24">
              <Button href="/docs/quickstart-forms" primary={true}>
                Get started
              </Button>
              <Button href="/#section-features">Explore features</Button>
            </div>
            <div className="flex items-center justify-center">
              <ThemedImage
                lightImg="https://github.com/EddieHubCommunity/BioDrop/assets/624760/abbe138e-17dc-4f9d-974d-d370621e3eb3"
                darkImg="https://github.com/EddieHubCommunity/BioDrop/assets/624760/8440663f-5f2f-46a4-941a-24bd33686877"
                width="600"
                height="600"
                alt="BioDrop demo image"
                priority={true}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-primary-low dark:drop-shadow-none dark:bg-dark-2 mb-8 p-8 drop-shadow-md">
        <BasicCards
          data={[
            {
              name: "Active Users",
              current: total.active,
              delta: today.users,
            },
            {
              name: "Profile Views",
              current: total.views,
              delta: today.views,
            },
            {
              name: "Links Clicked",
              current: total.clicks,
              delta: today.clicks,
            },
          ]}
        />
      </div>

      <div className="bg-primary-low dark:bg-dark-2">
        <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-lg bg-primary-high shadow-xl lg:grid lg:grid-cols-2 lg:gap-4">
            <div className="px-6 pt-8 pb-12 sm:px-12 sm:pt-12 lg:py-8 lg:pr-0 xl:py-16 xl:px-20 flex">
              <div className="lg:self-center">
                <h3 className="text-lg tracking-tight text-primary-low sm:text-4xl">
                  <span className="block">
                    Make it easier for people to find, follow and subscribe.
                  </span>
                </h3>
              </div>
            </div>
            <Image
              src="https://user-images.githubusercontent.com/109926117/234534981-9db096eb-dc79-4310-a7a6-e7fd46799dff.png"
              alt="BioDrop screenshot of statistics"
              width="600"
              height="300"
            />
          </div>
        </div>
      </div>

      <CallToAction
        title="Ready to dive in?"
        description="Add your free Profile today!"
        button1Link="/docs/quickstart-forms"
        button1Text="Get started"
        button2Link="/eddiejaoude"
        button2Text="Example"
      />

      <div className="bg-primary-high dark:bg-dark-2" id="section-features">
        <div className="mx-auto max-w-2xl py-12 px-4 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary-low sm:text-4xl">
              Popular Features
            </h2>
            <p className="mt-4 text-primary-low/80 text-xl">
              It is not just links...
            </p>
          </div>
          <div className="mt-16 mb-8 space-y-16">
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
                    "mt-6 lg:mt-0 lg:row-start-1 lg:col-span-5 xl:col-span-4",
                  )}
                >
                  <h3 className="text-lg sm:text-2xl font-bold text-primary-low">
                    {feature.name}
                  </h3>
                  <p className="mt-2 text-sm sm:text-lg text-primary-low/70">
                    {feature.description}
                  </p>
                  {feature.premium && (
                    <p className="mt-2 text-xs sm:text-sm text-primary-low/50 italic">
                      (Premium feature)
                    </p>
                  )}
                </div>
                <div
                  className={classNames(
                    featureIdx % 2 === 0
                      ? "lg:col-start-6 xl:col-start-5"
                      : "lg:col-start-1",
                    "flex-auto lg:row-start-1 lg:col-span-7 xl:col-span-8",
                  )}
                >
                  <div className="aspect-w-5 aspect-h-2 overflow-hidden rounded-lg bg-primary-low relative">
                    <ThemedImage
                      lightImg={feature.imageSrc}
                      darkImg={feature.imageSrc}
                      alt={feature.imageAlt}
                      className="object-contain object-center"
                      fill={true}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button href="/pricing" primary={true}>
            Full Feature list
          </Button>
        </div>
      </div>

      {randomProfile.username && (
        <UserMini
          BASE_URL={BASE_URL}
          text="Follow..."
          username={randomProfile.username}
          name={randomProfile.name}
          bio={randomProfile.bio}
        />
      )}

      <Testimonials data={testimonials} />

      <CallToAction
        title="Subscribe to our newsletter to learn more"
        description="Do not miss out!"
        button1Link="https://biodrop.substack.com"
        button1Text="Subscribe"
        button1OnClick={() => va.track("newsletter", { location: "homepage" })}
      />

      <Link
        href="/docs/faqs"
        rel="noopener noreferrer"
        target="_blank"
        className="fixed bottom-5 right-5 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-medium"
      >
        <div className="px-4 py-2 bg-tertiary-medium text-primary-medium flex items-center gap-1 rounded-full hover:drop-shadow-lg hover:bg-secondary-medium">
          <IconContext.Provider
            value={{ color: "primary-low", style: { verticalAlign: "middle" } }}
          >
            <MdHelpOutline />
          </IconContext.Provider>
          <p className="text-sm font-medium">Help</p>
        </div>
      </Link>
    </>
  );
}
