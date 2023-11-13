import { authOptions } from "../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { FaMapPin, FaArrowPointer, FaArrowRight } from "react-icons/fa6";

import { getUserApi } from "../../api/profiles/[username]";
import { clientEnv } from "@config/schemas/clientSchema";
import { getStats } from "../../api/account/statistics";
import logger from "@config/logger";
import Alert from "@components/Alert";
import Page from "@components/Page";
import PageHead from "@components/PageHead";
import { abbreviateNumber } from "@services/utils/abbreviateNumbers";
import Navigation from "@components/account/manage/Navigation";
import UserMini from "@components/user/UserMini";
import { PROJECT_NAME } from "@constants/index";
import Link from "@components/Link";

const DynamicChart = dynamic(
  () => import("../../../components/statistics/BarGraph"),
  { ssr: false },
);

export async function getServerSideProps(context) {
  const { req, res } = context;
  const session = await getServerSession(req, res, authOptions);
  const username = session.username;

  const { status, profile } = await getUserApi(req, res, username);
  if (status !== 200) {
    logger.error(
      profile.error,
      `profile loading failed for username: ${username}`,
    );

    return {
      redirect: {
        destination: "/account/no-profile",
        permanent: false,
      },
    };
  }

  let data = {};

  try {
    data = await getStats(username);
  } catch (e) {
    logger.error(e, "ERROR get user's account statistics");
  }

  data.links.individual = data.links.individual.filter((link) =>
    profile.links.some((pLink) => pLink.url === link.url),
  );

  const totalClicks = data.links.individual.reduce((acc, link) => {
    return acc + link.clicks;
  }, 0);
  data.links.clicks = totalClicks;

  data.profile.daily = data.profile.daily.map((day) => {
    return {
      views: day.views,
      date: day.date,
    };
  });

  return {
    props: {
      data,
      profile,
      BASE_URL: clientEnv.NEXT_PUBLIC_BASE_URL,
    },
  };
}

export default function Statistics({ data, profile, BASE_URL }) {
  const { data: session } = useSession();
  return (
    <>
      <PageHead
        title={PROJECT_NAME + " Statistics"}
        description="Private statistics for your account"
      />

      <Page>
        <Navigation />

        <UserMini
          BASE_URL={BASE_URL}
          username={profile.username}
          name={profile.name}
          bio={profile.bio}
          monthly={data.profile.monthly}
          total={data.profile.total}
          clicks={data.links.clicks}
          rank={data.profile.rank}
        />

        {!data.links && (
          <Alert type="warning" message="You don't have a profile yet." />
        )}

        {data.profile.daily.length > 0 && (
          <div className="border mb-6 dark:border-primary-medium">
            <div className="border-b border-primary-low bg-white dark:bg-primary-high dark:border-primary-medium px-4 py-5 mb-2 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-primary-high">
                Profile views
              </h3>
              <p className="mt-1 text-sm text-primary-medium dark:text-primary-medium-low">
                Number of Profile visits per day for the last 30 days
              </p>
            </div>
            <DynamicChart data={data.profile.daily} />
          </div>
        )}

        {session && session.accountType === "premium" && profile.stats && (
          <ul
            role="list"
            className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-2 xl:gap-x-8 mb-8"
          >
            {profile.stats.referers && (
              <li className="overflow-hidden rounded-xl border border-gray-200">
                <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                  <FaArrowPointer className="h-6 w-6 text-primary-medium" />
                  <div className="text-sm font-medium leading-6 text-primary-medium grow">
                    Referrers
                  </div>
                  <Link href="/account/statistics/referers">
                    <FaArrowRight className="h-6 w-6 text-primary-medium" />
                  </Link>
                </div>
                <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                  {Object.entries(profile.stats.referers)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 5)
                    .map((referer) => (
                      <div
                        key={referer[0]}
                        className="flex justify-between gap-x-4 py-3"
                      >
                        <dt className="text-primary-medium dark:text-primary-low">
                          {referer[0].replaceAll("|", ".")}
                        </dt>
                        <dd className="text-primary-medium dark:text-primary-low">
                          {referer[1]}
                        </dd>
                      </div>
                    ))}
                </dl>
              </li>
            )}
            {profile.stats.countries && (
              <li className="overflow-hidden rounded-xl border border-gray-200">
                <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                  <FaMapPin className="h-6 w-6 text-primary-medium" />
                  <div className="text-sm font-medium leading-6 text-primary-medium grow">
                    Locations
                  </div>
                  <Link href="/account/statistics/locations">
                    <FaArrowRight className="h-6 w-6 text-primary-medium" />
                  </Link>
                </div>
                <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                  {Object.entries(profile.stats.countries)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 5)
                    .map((country) => (
                      <div
                        key={country[0]}
                        className="flex justify-between gap-x-4 py-3"
                      >
                        <dt className="text-primary-medium dark:text-primary-low">
                          {country[0].replaceAll("|", ".")}
                        </dt>
                        <dd className="text-primary-medium dark:text-primary-low">
                          {country[1]}
                        </dd>
                      </div>
                    ))}
                </dl>
              </li>
            )}
          </ul>
        )}

        <table className="min-w-full divide-y divide-primary-medium-low">
          <thead className="bg-primary-low dark:bg-primary-medium">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-primary-high dark:text-primary-low sm:pl-6"
              >
                Your Links ({data.links.individual.length})
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
                  <td className="md:whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-primary-high dark:text-primary-low sm:pl-6 text-ellipsis overflow-hidden">
                    {session && session.accountType === "premium" && (
                      <Link href={`/account/statistics/link/${link._id}`}>
                        {link.url}
                      </Link>
                    )}
                    {session && session.accountType === "free" && (
                      <>{link.url}</>
                    )}
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
