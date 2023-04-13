import { authOptions } from "../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import ProgressBar from "@components/statistics/ProgressBar";
import { MDXProvider } from '@mdx-js/react'
import Bio from '../../components/hints/bio.mdx'
import Links from '../../components/hints/links.mdx'
import Milestones from '../../components/hints/milestones.mdx'
import Tags from '../../components/hints/tags.mdx'
import Socials from '../../components/hints/socials.mdx'
import Location from '../../components/hints/location.mdx'
import Testimonials from '../../components/hints/testimonials.mdx'
import Link from "next/link";
import {
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

import { getUserApi } from "../api/users/[username]";
import logger from "@config/logger";
import Alert from "@components/Alert";
import Page from "@components/Page";
import PageHead from "@components/PageHead";
import { abbreviateNumber } from "@services/utils/abbreviateNumbers";
import BasicCards from "@components/statistics/BasicCards";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useState } from "react";

export async function getServerSideProps(context) {
  const { req, res } = context;
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const username = session.username;
  const { status, profile } = await getUserApi(req, res, username);
  if (status !== 200) {
    logger.error(
      profile.error,
      `profile loading failed for username: ${username}`
    );

    return {
      redirect: {
        destination: "/account/no-profile",
        permanent: false,
      },
    };
  }

  let data = {};
  let profileSections = [
    "bio",
    "links",
    "milestones",
    "tags",
    "socials",
    "location",
    "testimonials",
  ];
  let progress = {
    percentage: 0,
    missing: [],
  };

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/account/statistics`,
      {
        headers: {
          cookie: context.req.headers.cookie || "",
        },
      }
    );
    data = await res.json();
  } catch (e) {
    logger.error(e, "ERROR get user's account statistics");
  }

  progress.missing = profileSections.filter(
    (property) => !Object.keys(profile).includes(property)
  );
  progress.percentage = (
    ((profileSections.length - progress.missing.length) /
      profileSections.length) *
    100
  ).toFixed(0);

  return {
    props: { session, data, profile, progress },
  };
}

export default function Statistics({ data, profile, progress }) {
  const dateTimeStyle = {
    dateStyle: "short",
  };
  const dailyViews = data.profile.daily.slice(-30).map((day) => {
    return {
      views: day.views,
      date: new Intl.DateTimeFormat("en-GB", dateTimeStyle).format(
        new Date(day.date)
      ),
    };
  });

  const profileSectionsSpecification = {
    "bio": { value: "bio", link: "https://linkfree.eddiehub.io/docs/how-to-guides/bio", description: "Describe in a few words who you are.", component: Bio },
    "links": { value: "links", link: "https://linkfree.eddiehub.io/docs/how-to-guides/links", description: "Let people discover all your great content in one place.", component: Links },
    "milestones": { value: "milestones", link: "https://linkfree.eddiehub.io/docs/how-to-guides/milestones", description: "Demonstrate the highlights of your career.", component: Milestones },
    "tags": { value: "tags", link: "https://linkfree.eddiehub.io/docs/how-to-guides/tags", description: "These are searchable keywords for people to discover your Profile.", component: Tags },
    "socials": { value: "socials", link: "https://linkfree.eddiehub.io/docs/how-to-guides/socials-shortcuts", description: "Add a shortcut to your favourite social media accounts.", component: Socials },
    "location": { value: "location", link: "https://linkfree.eddiehub.io/docs/how-to-guides/events", description: "Add events you either hosted or attended.", component: Location },
    "testimonials": { value: "testimonials", link: "https://linkfree.eddiehub.io/docs/how-to-guides/testimonials", description: "Show off the great feedback you have received.", component: Testimonials },
  }
  const [hint, setHint] = useState(profileSectionsSpecification[progress.missing[0]])

  const cardData = [
    {
      name: "Total views",
      current: data.profile.monthly,
      total: data.profile.total,
      delta: data.profile.total - data.profile.monthly,
    },
    {
      name: "Total links",
      current: data.links.individual.length,
    },
    {
      name: "Total link clicks",
      current: data.links.clicks,
    },
  ];

  return (
    <>
      <PageHead
        title="LinkFree Statistics"
        description="Private statistics for your account"
      />

      <Page>
        <div className="w-full border p-4 my-6 dark:border-primary-medium">
          <span className="flex flex-row justify-between">
            <span className="text-lg font-medium text-primary-medium dark:text-primary-low">
              Profile Completion: {progress.percentage}%
            </span>
            {progress.missing.length > 0 && (
              <span className="text-primary-low-medium">
                (missing sections in your profile are:{" "}
                {progress.missing.join(",")})
              </span>
            )}
          </span>

          <ProgressBar progress={progress} />

          <span className="flex flex-col justify-between mt-6">
            <span className="text-lg font-medium text-primary-medium dark:text-primary-low">
              Here is how you can stengthen your profile 💪
            </span>
            <div className="flex flex-row justify-center items-center border p-4 my-6 dark:border-primary-medium">
              <p className="mt-1 text-sm text-primary-medium dark:text-primary-low-medium w-2/12 ">
                {hint.description}
              </p>
              <span className="w-8/12 mx-auto">
                <MDXProvider>
                  <hint.component />
                </MDXProvider>
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <button
                  onClick={() => setHint(profileSectionsSpecification[progress.missing[progress.missing.indexOf(hint.value) == 0 ? progress.missing.length - 1 : progress.missing.indexOf(hint.value) - 1]])}
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-primary-black hover:text-white hover:bg-primary-medium focus:outline-offset-2 mx-auto"
                  aria-controls="mobile-menu"
                > <FiChevronLeft /> Prev </button>
                <button
                  onClick={() => setHint(profileSectionsSpecification[progress.missing[(progress.missing.indexOf(hint.value) + 1) % (progress.missing.length)]])}
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-primary-black hover:text-white hover:bg-primary-medium focus:outline-offset-2 mx-auto"
                  aria-controls="mobile-menu"
                > Next <FiChevronRight /> </button>
              </div>
              <Link
                href={hint.link}
                rel="noopener noreferrer"
                target="_blank"
                className="bg-secondary-high inline-flex items-center justify-center p-2 rounded-md text-white  hover:text-white hover:bg-primary-medium focus:outline-offset-2 "
              > Learn More </Link>
            </div>

          </span>
        </div>

        <h1 className="text-4xl mb-4 font-bold">
          Your Statistics for {profile.name} ({profile.username})
        </h1>

        {!data.links && (
          <Alert type="info" message="You don't have a profile yet." />
        )}

        <BasicCards data={cardData} />

        <div className="border my-6 dark:border-primary-medium">
          <div className="border-b border-primary-low bg-white dark:bg-primary-high dark:border-primary-medium px-4 py-5 mb-2 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-primary-high">
              Profile views
            </h3>
            <p className="mt-1 text-sm text-primary-medium dark:text-primary-low-medium">
              How many profile visits you got per day. You have{" "}
              {abbreviateNumber(data.profile.monthly)} Profile views in the last
              30 days with a total of {abbreviateNumber(data.profile.total)}.
            </p>
          </div>
          <div className="w-full h-80">
            <ResponsiveContainer height="100%">
              <BarChart data={dailyViews}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="views" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <table className="min-w-full divide-y divide-primary-low-medium">
          <thead className="bg-primary-low dark:bg-primary-medium">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-primary-high dark:text-primary-low sm:pl-6"
              >
                Url ({data.links.individual.length})
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-primary-high"
              >
                Clicks ({abbreviateNumber(data.links.clicks)})
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary-low dark:divide-primary-medium bg-white dark:bg-primary-high">
            {data.links &&
              data.links.individual.map((link) => (
                <tr key={link.url}>
                  <td className="md:whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-primary-high dark:text-primary-low sm:pl-6">
                    {link.url}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-primary-medium dark:text-primary-low">
                    {abbreviateNumber(link.clicks)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Page>
    </>
  );
}
