import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { clientEnv } from "@config/schemas/clientSchema";

import logger from "@config/logger";
import Page from "@components/Page";
import PageHead from "@components/PageHead";
import { getProfiles } from "../api/admin/profiles";

import { serverEnv } from "@config/schemas/serverSchema";
import Navigation from "@components/admin/Navigation";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "@components/Link";

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

  let profiles = [];
  try {
    profiles = await getProfiles();
  } catch (e) {
    logger.error(e, "get users failed");
  }
  return {
    props: {
      profiles,
      BASE_URL: clientEnv.NEXT_PUBLIC_BASE_URL,
    },
  };
}

export default function USERS({ profiles }) {
  return (
    <>
      <PageHead
        title="LinkFree admin users"
        description="Overview for LinkFree admins"
      />
      <Page>
        <Navigation />
        <h1 className="text-4xl mb-4 font-bold">Profiles</h1>
        <ul role="list" className="divide-y divide-gray-100">
          {profiles.map((profile) => (
            <li
              key={profile.username}
              className="relative flex justify-between gap-x-6 py-5"
            >
              <div className="flex gap-x-4">
                <Image
                  className="flex-none rounded-full bg-gray-50"
                  width={48}
                  height={48}
                  src={`https://github.com/${profile.username}.png`}
                  alt="description of image"
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6">
                    <span className="absolute inset-x-0 -top-px bottom-0" />
                    <Link href={`/${profile.username}`}>
                      <span className="absolute inset-x-0 -top-px bottom-0" />
                      {profile.name}
                    </Link>
                  </p>
                  <p className="mt-1 flex text-xs leading-5 text-primary-medium dark:text-primary-low">
                    <span className="relative truncate hover:underline">
                      {profile.bio}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-x-4">
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-primary-high dark:text-primary-low">
                    {profile.source}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-primary-medium dark:text-primary-low">
                    UpdateAt{" "}
                    <time dateTime={profile.updatedAt}>
                      {profile.updatedAt}
                    </time>
                  </p>
                </div>
                <ChevronRightIcon
                  className="h-5 w-5 flex-none text-primary-medium dark:text-primary-low"
                  aria-hidden="true"
                />
              </div>
            </li>
          ))}
        </ul>
      </Page>
    </>
  );
}
