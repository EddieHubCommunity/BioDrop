import { authOptions } from "../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

import {
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

import logger from "../../config/logger";
import Alert from "../../components/Alert";
import Page from "../../components/Page";
import PageHead from "../../components/PageHead";
import { abbreviateNumber } from "../../services/utils/abbreviateNumbers";
import BasicCards from "../../components/statistics/BasicCards";

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const username = session.username;

  let profile = {};
  try {
    const resUser = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${username}`
    );
    profile = await resUser.json();
  } catch (e) {
    logger.error(e, `profile loading failed for username: ${username}`);
  }

  if (!profile.username) {
    return {
      redirect: {
        destination: "/account/no-profile",
        permanent: false,
      },
    };
  }

  let data = {};
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
    console.log("ERROR get user's account statistics", e);
  }

  return {
    props: { session, data, profile },
  };
}

export default function Statistics({ data, profile }) {
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
        <h1 className="text-4xl mb-4 font-bold">
          Your Statistics for {profile.name} ({profile.username})
        </h1>

        {!data.links && (
          <Alert type="info" message="You don't have a proile yet." />
        )}

        <BasicCards data={cardData} />

        <div className="border my-6">
          <div className="border-b border-gray-200 bg-white px-4 py-5 mb-2 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Profile views
            </h3>
            <p className="mt-1 text-sm text-gray-500">
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
                <Bar dataKey="views" fill="#82ca9d" />
                <Tooltip />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Url ({data.links.individual.length})
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Clicks ({abbreviateNumber(data.links.clicks)})
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {data.links &&
              data.links.individual.map((link) => (
                <tr key={link.url}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {link.url}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
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
