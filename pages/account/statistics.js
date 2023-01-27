import { authOptions } from "../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

import Page from "../../components/Page";
import PageHead from "../../components/PageHead";

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  let data = {};
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/account/statistics`
    );
    data = await res.json();
  } catch (e) {
    console.log("ERROR get user's account statistics", e);
  }

  return {
    props: { session, data },
  };
}

export default function Search({ data }) {
  return (
    <>
      <PageHead
        title="LinkFree Statistics"
        description="Private statistics for your account"
      />

      <Page>
        <h1 className="text-4xl mb-4 font-bold">Your Statistics</h1>

        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Url
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Clicks
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {data.links.individual.map((link) => (
              <tr key={link.url}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {link.url}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {link.clicks}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Page>
    </>
  );
}
