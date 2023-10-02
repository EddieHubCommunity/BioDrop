import { authOptions } from "../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { getUserApi } from "../../api/profiles/[username]";
import { clientEnv } from "@config/schemas/clientSchema";
import { getStats } from "../../api/account/statistics";
import logger from "@config/logger";
import Page from "@components/Page";
import PageHead from "@components/PageHead";
import Navigation from "@components/account/manage/Navigation";
import { PROJECT_NAME } from "@constants/index";

const DynamicChart = dynamic(
  () => import("../../../components/statistics/StatsChart"),
  { ssr: false },
);

export async function getServerSideProps(context) {
  const { req, res } = context;
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
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

export default function Statistics({ data }) {
  const router = useRouter();

  const { data: session } = useSession();
  if (typeof window !== "undefined" && window.localStorage) {
    if (router.query.alert) {
      localStorage.removeItem("premium-intent");
    }
    if (
      session &&
      session.accountType !== "premium" &&
      localStorage.getItem("premium-intent")
    ) {
      localStorage.removeItem("premium-intent");
      router.push("/api/stripe");
    }
  }

  return (
    <>
      <PageHead
        title={PROJECT_NAME + " Statistics"}
        description="Private statistics for your account"
      />

      <Page>
        <Navigation />

        {data.profile.daily.length > 0 && (
          <div className="border mb-6 dark:border-primary-medium">
            <div className="border-b border-primary-low bg-white dark:bg-primary-high dark:border-primary-medium px-4 py-5 mb-2 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-primary-high">
                Profile views
              </h3>
              <p className="mt-1 text-sm text-primary-medium dark:text-primary-medium-low">
                Number of Profile visits per day.
              </p>
            </div>
            <DynamicChart data={data.profile.daily} />
          </div>
        )}
      </Page>
    </>
  );
}
