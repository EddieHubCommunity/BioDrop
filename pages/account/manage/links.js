// add manage link to navbar
// form add link
// form edit link
// delete existing link

import { authOptions } from "../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";

import logger from "@config/logger";
import PageHead from "@components/PageHead";
import Page from "@components/Page";
import Button from "@components/Button";
import Navigation from "@components/account/manage/navigation";
import { getLinksApi } from "pages/api/account/manage/links";

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

  let links = [];
  try {
    links = await getLinksApi(username);
  } catch (e) {
    logger.error(e, `profile loading failed links for username: ${username}`);
  }

  return {
    props: { links, BASE_URL: process.env.NEXT_PUBLIC_BASE_URL },
  };
}

export default function Links({ BASE_URL, links }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${BASE_URL}/api/account/manage/link`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(links),
    });
    const data = await res.json();
  };

  return (
    <>
      <PageHead
        title="Manage Links"
        description="Here you can manage your LinkFree links"
      />

      <Page>
        <Navigation />
        <form
          className="space-y-8 divide-y divide-gray-200"
          onSubmit={handleSubmit}
        >
          <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
            <div className="space-y-6 sm:space-y-5">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  What links would you like to appear on your profile?
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Some can be promoted to under your name
                </p>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Group
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    name="link"
                    id="link"
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                  />
                </div>
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Name
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    name="link"
                    id="link"
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                  />
                </div>
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Url
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    name="link"
                    id="link"
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                  />
                </div>
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Icon
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    name="link"
                    id="link"
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                  />
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>

        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Url
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Group
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Icon
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Enabled
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Pinned
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {links.map((link) => (
              <tr key={link.url}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                  {link.name}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {link.url}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {link.group}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {link.icon}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {link.isEnabled ? (
                    <MdRadioButtonChecked />
                  ) : (
                    <MdRadioButtonUnchecked />
                  )}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {link.isPinned ? (
                    <MdRadioButtonChecked />
                  ) : (
                    <MdRadioButtonUnchecked />
                  )}
                </td>
                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                  <Button text="Edit" primary={true} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Page>
    </>
  );
}
