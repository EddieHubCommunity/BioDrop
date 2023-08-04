import UserEvent from "../UserEvent";
import UserBio from "../UserBio";
import UserMilestones from "../UserMilestones";
import UserLinks from "../UserLinks";
import UserRepos from "../UserRepos";
import { useMemo } from "react";

export default function UserDashboard({ data, BASE_URL }) {
  const latestEvent = useMemo(
    () =>
      data.events?.length
        ? data.events.reduce((a, b) => {
            return new Date(a.date?.start) > new Date(b.date?.start) ? a : b;
          }, {})
        : {},
    [data]
  );

  return (
    <>
      <main>
        <UserBio user={data} BASE_URL={BASE_URL} />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <div className="lg:col-start-3 lg:row-end-1">
              <h2 className="sr-only">Latest event</h2>
              <UserEvent event={latestEvent} title="Latest event" />
            </div>

            <div className="-mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pb-20 xl:pt-16 flex flex-col gap-16">
              {!!data.repos?.length && (
                <div className="w-full whitespace-nowrap text-left text-sm leading-6">
                  <h2 scope="col" className="px-0 py-3 font-semibold text-xl">
                    Repos
                  </h2>
                  <UserRepos repos={data.repos || []} />
                </div>
              )}
              <div className="w-full whitespace-nowrap text-left text-sm leading-6">
                <h2 scope="col" className="px-0 py-3 font-semibold text-xl">
                  Links
                </h2>
                <UserLinks
                  BASE_URL={BASE_URL}
                  username={data.username}
                  links={data.links || []}
                />
              </div>
            </div>

            <div className="lg:col-start-3">
              <h2 className="text-sm font-semibold leading-6 text-gray-900">
                Milestones
              </h2>
              <UserMilestones milestones={data.milestones || []} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
