import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { clientEnv } from "@config/schemas/clientSchema";

import logger from "@config/logger";
import Page from "@components/Page";
import PageHead from "@components/PageHead";
import { getUsers } from "../api/admin/users";

import { serverEnv } from "@config/schemas/serverSchema";
import Navigation from "@components/admin/Navigation";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

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

  let users = [];
  try {
    users = await getUsers();
  } catch (e) {
    logger.error(e, "get users failed");
  }
  return {
    props: {
      username,
      users,
      BASE_URL: clientEnv.NEXT_PUBLIC_BASE_URL,
    },
  };
}

export default function USERS({ users }) {
  return (
    <>
      <PageHead
        title="LinkFree admin over"
        description="Overview for LinkFree admins"
      />
      <Page>
        <Navigation />
        <h1 className="text-4xl mb-4 font-bold">Users</h1>
        <ul role="list" className="divide-y divide-gray-100">
          {users.map((person) => (
            <li
              key={person.username}
              className="relative flex justify-between gap-x-6 py-5"
            >
              <div className="flex gap-x-4">
                <Image
                  className="flex-none rounded-full bg-gray-50"
                  width={48}
                  height={48}
                  src={"https://github.com/" + person.username + ".png"}
                  alt="description of image"
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6">
                    <span className="absolute inset-x-0 -top-px bottom-0" />
                    <a href={"https://github.com/" + person.username}>
                      <span className="absolute inset-x-0 -top-px bottom-0" />
                      {person.name}
                    </a>
                  </p>
                  <p className="mt-1 flex text-xs leading-5 text-gray-500">
                    <a className="relative truncate hover:underline">
                      {person.bio.length > 100
                        ? person.bio.substring(0, 99) + "..."
                        : person.bio}
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-x-4">
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">
                    {person.role}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    UpdateAt{" "}
                    <time dateTime={person.updatedAt}>{person.updatedAt}</time>
                  </p>
                </div>
                <a href={"https://github.com/" + person.username}>
                  <ChevronRightIcon
                    className="h-5 w-5 flex-none text-gray-400"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </Page>
    </>
  );
}
