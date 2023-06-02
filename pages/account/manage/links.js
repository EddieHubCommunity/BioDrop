import { authOptions } from "../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { FaEdit } from "react-icons/fa";

import logger from "@config/logger";
import PageHead from "@components/PageHead";
import Page from "@components/Page";
import Navigation from "@components/account/manage/navigation";
import { getLinksApi } from "pages/api/account/manage/links";
import Button from "@components/Button";

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
    props: { links },
  };
}

export default function Links({ links }) {
  return (
    <>
      <PageHead
        title="Manage Links"
        description="Here you can manage your LinkFree links"
      />

      <Page>
        <Navigation />

        <Button href="/account/manage/link" text="Add Link" />

        <ul role="list" className="divide-y divide-gray-100">
          {links.map((link) => (
            <li
              key={link._id}
              className="flex items-center justify-between gap-x-6 py-5"
            >
              <div className="min-w-0">
                <div className="flex items-start gap-x-3">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {link.name}
                  </p>
                  <p
                    className={`rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset ${
                      link.isEnabled
                        ? "text-green-700 bg-green-50 ring-green-600/20"
                        : "text-yellow-800 bg-yellow-50 ring-yellow-600/20"
                    }`}
                  >
                    {link.isEnabled ? "Enabled" : "Disabled"}
                  </p>
                </div>
                <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                  <p className="whitespace-nowrap">{link.url}</p>
                </div>
              </div>
              <div className="flex flex-none items-center gap-x-4">
                <Button
                  icon={<FaEdit />}
                  href={`/account/manage/link/${link._id}`}
                  text="Edit"
                />
              </div>
            </li>
          ))}
        </ul>
      </Page>
    </>
  );
}
