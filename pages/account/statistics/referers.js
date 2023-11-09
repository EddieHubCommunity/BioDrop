import { authOptions } from "../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import dynamic from "next/dynamic";

import { getUserApi } from "../../api/profiles/[username]";
import logger from "@config/logger";
import Alert from "@components/Alert";
import Page from "@components/Page";
import PageHead from "@components/PageHead";
import { abbreviateNumber } from "@services/utils/abbreviateNumbers";
import Navigation from "@components/account/manage/Navigation";
import { PROJECT_NAME } from "@constants/index";

const DynamicChart = dynamic(
  () => import("../../../components/statistics/PieGraph"),
  { ssr: false },
);

export async function getServerSideProps(context) {
  const { req, res } = context;
  const session = await getServerSession(req, res, authOptions);

  if (session.accountType !== "premium") {
    return {
      redirect: {
        destination: "/account/onboarding",
        permanent: false,
      },
    };
  }

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

  let stats = [];
  if (profile.stats?.referers) {
    stats = Object.keys(profile.stats.referers)
      .map((referer) => ({
        referer,
        value: profile.stats.referers[referer],
      }))
      .sort((a, b) => b.value - a.value);
  }

  return {
    props: {
      stats,
    },
  };
}

export default function Locations({ stats }) {
  return (
    <>
      <PageHead
        title={PROJECT_NAME + " Statistics"}
        description="Private statistics for your account"
      />

      <Page>
        <Navigation />

        {!stats.length && (
          <Alert
            type="warning"
            message="You don't have any referers stats yet."
          />
        )}

        {stats.length > 0 && <DynamicChart data={stats} />}

        <table className="min-w-full divide-y divide-primary-medium-low">
          <thead className="bg-primary-low dark:bg-primary-medium">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-primary-high dark:text-primary-low sm:pl-6"
              >
                Referers
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-primary-high"
              >
                Visits
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary-low dark:divide-primary-medium bg-white dark:bg-primary-high">
            {stats &&
              stats.map((item) => (
                <tr key={item.referer}>
                  <td className="md:whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-primary-high dark:text-primary-low sm:pl-6">
                    {item.referer.replaceAll("|", ".")}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-primary-medium dark:text-primary-low">
                    {abbreviateNumber(item.value)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Page>
    </>
  );
}
