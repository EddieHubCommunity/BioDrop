import Page from "@components/Page";
import PageHead from "@components/PageHead";
import Link from "@components/Link";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { getProfilesApi } from "../api/admin/profiles";

export async function getServerSideProps(context) {
  const { req, res } = context;
  // TODO: check is admin

  const { status, profiles } = await getProfilesApi();

  console.log(profiles);
  return {
    props: { profiles },
  };
}

export default function Profiles({ profiles }) {
  const person = {
    name: "Leslie Alexander",
    email: "leslie.alexander@example.com",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "#",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  };

  return (
    <>
      <PageHead title="Profiles" description="Admin Profile Page" />

      <Page>
        <ul role="list" className="divide-y divide-gray-100">
          {profiles.map((profile) => (
            <li
              key={profile.source}
              className="relative flex justify-between gap-x-6 py-5"
            >
              <div className="flex gap-x-4">
                <img
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  src={profile.avatar}
                  alt=""
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    <Link href={`/.profile.username`}>
                      <span className="absolute inset-x-0 -top-px bottom-0" />
                      {profile.name}
                    </Link>
                    (Github Username: {profile.username})
                  </p>
                  <p className="mt-1 flex text-xs leading-5 text-gray-500">
                    <a
                      href={`mailto:${person.email}`}
                      className="relative truncate hover:underline"
                    >
                      {profile.source}
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-x-4">
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">
                    Views: {profile.views}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Last updated{" "}
                    <time dateTime={profile.updatedAt}>
                      {profile.updatedAt}
                    </time>
                  </p>
                  {profile.isEnabled && (
                    <div className="mt-1 flex items-center gap-x-1.5">
                      <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      </div>
                      <p className="text-xs leading-5 text-gray-500">Enabled</p>
                    </div>
                  )}
                  {!profile.isEnabled && (
                    <div className="mt-1 flex items-center gap-x-1.5">
                      <div className="flex-none rounded-full bg-red-500/20 p-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                      </div>
                      <p className="text-xs leading-5 text-gray-500">
                        Disabled
                      </p>
                    </div>
                  )}
                </div>
                <ChevronRightIcon
                  className="h-5 w-5 flex-none text-gray-400"
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
