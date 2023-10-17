import { clientEnv } from "@config/schemas/clientSchema";

import logger from "@config/logger";
import Page from "@components/Page";
import PageHead from "@components/PageHead";

import { getStatsApi } from "pages/api/admin/stats";
import Navigation from "@components/admin/Navigation";
import { PROJECT_NAME } from "@constants/index";

export async function getServerSideProps() {
  let data = {};
  try {
    data = await getStatsApi();
  } catch (e) {
    logger.error(e, "server stats failed");
  }

  return {
    props: {
      stats: data.stats,
      BASE_URL: clientEnv.NEXT_PUBLIC_BASE_URL,
    },
  };
}

export default function Statistics({ stats }) {
  const displayStats = [
    { id: 1, name: "Total Profiles", value: stats.profiles },
    { id: 2, name: "Profiles using JSON", value: stats.profilesUsingJson },
    { id: 3, name: "Profiles using forms", value: stats.profilesUsingForms },
    { id: 4, name: "Profiles not enabled", value: stats.totalProfilesDisabled },
    { id: 5, name: "Premium Profiles", value: stats.totalPremiumProfiles },
    { id: 6, name: "Changelogs", value: stats.totalChangelogs },
  ];

  return (
    <>
      <PageHead
        title={PROJECT_NAME + " admin over"}
        description={`Overview for ${PROJECT_NAME} admins`}
      />
      <Page>
        <Navigation />
        <h1 className="text-4xl mb-4 font-bold">Admin</h1>

        <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
          {displayStats.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-col bg-primary-medium/5 dark:bg-primary-low-medium/5 p-8"
            >
              <dt className="text-sm font-semibold leading-6 text-primary-medium dark:text-primary-low">
                {stat.name}
              </dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-primary-high dark:text-primary-low">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </Page>
    </>
  );
}
