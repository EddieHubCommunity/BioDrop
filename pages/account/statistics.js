import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import ProgressBar from "@components/statistics/ProgressBar";

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
import { getStats } from "../api/account/statistics";
import logger from "@config/logger";
import Alert from "@components/Alert";
import Page from "@components/Page";
import PageHead from "@components/PageHead";
import { abbreviateNumber } from "@services/utils/abbreviateNumbers";
import BasicCards from "@components/statistics/BasicCards";
import Link from "@components/Link";

export async function getServerSideProps(context) {
  const { req, res } = context;
  const session = await getServerSession(req, res, authOptions);

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
    data = await getStats(username);
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

  data.links.individual = data.links.individual.filter((link) =>
    profile.links.some((pLink) => pLink.url === link.url)
  );

  const totalClicks = data.links.individual.reduce((acc, link) => {
    return acc + link.clicks;
  }, 0);
  data.links.clicks = totalClicks;

  return {
    props: { data, profile, progress },
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
              <span className="text-primary-medium-low">
                (missing sections in your profile are:{" "}
                {progress.missing.join(",")})
              </span>
            )}
          </span>

          <ProgressBar progress={progress} />
        </div>

        <h1 className="text-4xl mb-4 font-bold">
          Your Statistics for {profile.name} (
          <Link
            href={`${process.env.NEXT_PUBLIC_BASE_URL}/${profile.username}`}
          >
            {profile.username}
          </Link>
          )
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
            <p className="mt-1 text-sm text-primary-medium dark:text-primary-medium-low">
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
                <Tooltip
                  contentStyle={{
                    color: "black",
                  }}
                />
                <Bar dataKey="views" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <table className="min-w-full divide-y divide-primary-medium-low">
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
