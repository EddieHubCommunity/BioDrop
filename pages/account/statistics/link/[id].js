import { authOptions } from "../../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import dynamic from "next/dynamic";

import { getUserApi } from "../../../api/profiles/[username]";
import logger from "@config/logger";
import Page from "@components/Page";
import PageHead from "@components/PageHead";
import Navigation from "@components/account/manage/Navigation";
import { PROJECT_NAME } from "@constants/index";
import { getStatsForLink } from "pages/api/account/statistics/link/[id]";
import Alert from "@components/Alert";

const DynamicChart = dynamic(
  () => import("../../../../components/statistics/BarGraph"),
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

  let data = {};
  try {
    data = await getStatsForLink(username, context.query.id);
  } catch (e) {
    logger.error(e, "ERROR get user's account statistics");
  }

  return {
    props: {
      data,
      profile,
    },
  };
}

export default function Statistics({ data }) {
  return (
    <>
      <PageHead
        title={PROJECT_NAME + " Statistics"}
        description="Private statistics for your account"
      />

      <Page>
        <Navigation />

        {data.stats.length === 0 && (
          <Alert type="info" message={`No data for "${data.url}"`} />
        )}

        {data.stats.length > 0 && (
          <div className="border mb-6 dark:border-primary-medium">
            <div className="border-b border-primary-low bg-white dark:bg-primary-high dark:border-primary-medium px-4 py-5 mb-2 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-primary-high">
                Link clicks for {data.url}
              </h3>
              <p className="mt-1 text-sm text-primary-medium dark:text-primary-medium-low">
                Number of link clicks per day for the last 30 days (total:{" "}
                {data.total})
              </p>
            </div>
            <DynamicChart data={data.stats} dataKey="clicks" />
          </div>
        )}
      </Page>
    </>
  );
}
