import { authOptions } from "../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { PencilIcon, DocumentPlusIcon } from "@heroicons/react/24/outline";

import logger from "@config/logger";
import PageHead from "@components/PageHead";
import Page from "@components/Page";
import Navigation from "@components/account/manage/navigation";
import { getLinksApi } from "pages/api/account/manage/links";
import Button from "@components/Button";
import UserLinks from "@components/user/UserLinks";

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
    props: { username, links, BASE_URL: process.env.NEXT_PUBLIC_BASE_URL },
  };
}

export default function Links({ BASE_URL, username, links }) {
  return (
    <>
      <PageHead
        title="Manage Links"
        description="Here you can manage your LinkFree links"
      />

      <Page>
        <Navigation />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 xl:gap-x-48">
          <div>
            <Button href="/account/manage/link">
              <DocumentPlusIcon className="h-5 w-5 mr-2" />
              Add Link
            </Button>

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
                      {link.isPinned && (
                        <p className="rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset text-blue-700 bg-blue-50 ring-blue-600/20">
                          Pinned
                        </p>
                      )}
                    </div>
                    <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                      <p className="whitespace-nowrap">{link.url}</p>
                    </div>
                  </div>
                  <div className="flex flex-none items-center gap-x-4">
                    <Button href={`/account/manage/link/${link._id}`}>
                      <PencilIcon className="h-5 w-5 mr-2" />
                      Edit
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <UserLinks links={links} username={username} BASE_URL={BASE_URL} />
          </div>
        </div>
      </Page>
    </>
  );
}
