import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { clientEnv } from "@config/schemas/clientSchema";

import logger from "@config/logger";
import Page from "@components/Page";
import PageHead from "@components/PageHead";

import { serverEnv } from "@config/schemas/serverSchema";
import { getStatsApi } from "pages/api/admin/stats";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  const username = session.username;

  if (!serverEnv.ADMIN_USERS.includes(username)) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  let data = {};
  try {
    data = await getStatsApi(username);
  } catch (e) {
    logger.error(e, "server stats failed");
  }

  return {
    props: {
      stats: data.stats,
      username,
      BASE_URL: clientEnv.NEXT_PUBLIC_BASE_URL,
    },
  };
}

export default function Admin({ stats }) {
  const displayStats = [
    { id: 1, name: "Total Profiles", value: stats.profiles },
    { id: 2, name: "Profiles using JSON", value: stats.profilesUsingJson },
    { id: 3, name: "Profiles using forms", value: stats.profilesUsingForms },
    { id: 4, name: "Profiles not enabled", value: stats.totalProfilesDisabled },
  ];

  return (
    <>
      <PageHead
        title="LinkFree admin over"
        description="Overview for LinkFree admins"
      />
      <Page>
        <h1 className="text-4xl mb-4 font-bold">Admin</h1>

        <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
          {displayStats.map((stat) => (
            <div key={stat.id} className="flex flex-col bg-gray-400/5 p-8">
              <dt className="text-sm font-semibold leading-6 text-gray-600">
                {stat.name}
              </dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </Page>
    </>
  );
}
