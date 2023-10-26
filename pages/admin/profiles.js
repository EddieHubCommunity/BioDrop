import { clientEnv } from "@config/schemas/clientSchema";

import logger from "@config/logger";
import Page from "@components/Page";
import PageHead from "@components/PageHead";
import { getProfiles } from "../api/admin/profiles";

import Navigation from "@components/admin/Navigation";
import ChevronRightIcon from "@heroicons/react/20/solid/ChevronRightIcon";
import Image from "next/image";
import Link from "@components/Link";
import { PROJECT_NAME } from "@constants/index";
import Button from "@components/Button";

export async function getServerSideProps(context) {
  let profiles = [];
  const { filter } = context.query;
  try {
    profiles = await getProfiles(filter);
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

export default function Users({ profiles }) {
  return (
    <>
      <PageHead
        title={`${PROJECT_NAME} admin users`}
        description={`Overview for ${PROJECT_NAME}ins`}
      />
      <Page>
        <Navigation />
        <h1 className="text-4xl mb-4 font-bold">Profiles</h1>

        <div className="flex gap-4">
          <Button href="/admin/profiles?filter=recently updated">
            Recently updated
          </Button>
          <Button href="/admin/profiles?filter=by rank">By Rank</Button>
          <Button href="/admin/profiles?filter=premium">Premium</Button>
          <Button href="/admin/profiles?filter=isShadowBanned">
            Shadow Banned
          </Button>
        </div>

        <ul role="list" className="divide-y divide-primary-low">
          {profiles.map((profile) => (
            <li
              key={profile.username}
              className="relative flex justify-between gap-x-6 py-5"
            >
              <div className="flex gap-x-4">
                <Image
                  className="flex-none rounded-full bg-primary-low"
                  width={48}
                  height={48}
                  src={`https://github.com/${profile.username}.png`}
                  alt="description of image"
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 flex gap-2">
                    <span className="absolute inset-x-0 -top-px bottom-0" />
                    <Link href={`/${profile.username}`}>
                      <span className="absolute inset-x-0 -top-px bottom-0" />
                      {profile.name}
                    </Link>
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      Views {profile.views}
                    </span>
                    <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                      Status{" "}
                      {profile.isEnabled || profile.isEnabled === undefined
                        ? "Enabled"
                        : "Disabled"}
                    </span>
                    <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-secondary-high ring-1 ring-inset ring-yellow-600/20">
                      Links {profile.links?.length}
                    </span>
                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-secondary-high ring-1 ring-inset ring-blue-700/10">
                      Milestones {profile.milestones?.length}
                    </span>
                    <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-secondary-high ring-1 ring-inset ring-secondary-high/10">
                      Events {profile.events?.length}
                    </span>
                    <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-secondary-high ring-1 ring-inset ring-secondary-high/10">
                      Testimonials {profile.testimonials?.length}
                    </span>
                    <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-secondary-high ring-1 ring-inset ring-secondary-high/10">
                      Repos {profile.repos?.length}
                    </span>
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
                    Update at{" "}
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
