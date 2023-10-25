import logger from "@config/logger";
import Page from "@components/Page";
import PageHead from "@components/PageHead";

import Navigation from "@components/admin/Navigation";
import { PROJECT_NAME } from "@constants/index";
import { getChangelogs } from "pages/api/admin/changelog";
import dateFormat from "@services/utils/dateFormat";
import Button from "@components/Button";

export async function getServerSideProps(context) {
  let data = [];
  const { filter } = context.query;
  try {
    data = await getChangelogs(filter);
  } catch (e) {
    logger.error(e, "get changelog failed");
  }

  return {
    props: {
      data: data,
    },
  };
}

export default function Statistics({ data }) {
  return (
    <>
      <PageHead
        title={PROJECT_NAME + " admin over"}
        description={`Overview for ${PROJECT_NAME} admins`}
      />
      <Page>
        <Navigation />
        <h1 className="text-4xl mb-4 font-bold">Changelog</h1>

        <div className="flex gap-4">
          <Button href="/admin/changelog?filter=recently updated">
            By Recent
          </Button>
          <Button href="/admin/changelog?filter=user">User</Button>
        </div>

        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
              >
                User
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Diff
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Model
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Operation
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Date
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                <span className="sr-only">View</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((log) => (
              <tr key={log._id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                  {log.user[0].name}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <div>
                    <pre>{JSON.stringify(log.diff, null, 2)}</pre>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {log.model}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {log.operation}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {dateFormat({ format: "long", date: log.createdAt })}
                </td>
                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                  -
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Page>
    </>
  );
}
