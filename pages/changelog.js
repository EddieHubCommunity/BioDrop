import { CalendarIcon } from "@heroicons/react/20/solid";

import { Page, PageHead } from "@components";


export default function Changelog() {
  const colors = {
    addition: "text-green-800 bg-green-100",
    removal: "text-red-800 bg-red-100",
  };
  const changes = [
    {
      title: "Profile progress bar",
      description:
        "It is now possible to track your LinkFree profile progress",
      type: "addition",
      date: "2023-03-26",
    },
    {
      title: "Profile QR code download",
      description:
        "It is now possible to download your LinkFree QR code, so you can use it offline and in other places.",
      type: "addition",
      date: "2023-03-31",
    },
    {
      title: "Dedicated domain (url)",
      description:
        "You can start using the shorter url linkfree.io, the previous domain still works also",
      type: "addition",
      date: "2023-03-12",
    },
    {
      title: "Playground",
      description:
        "You can now test and preview your profile with any json changes",
      type: "addition",
      date: "2023-03-07",
    },
    {
      title: "Accounts statistics summary",
      description:
        "On your private dashboard you have a summary of your stats at the top",
      type: "addition",
      date: "2023-02-11",
    },
    {
      title: "Logging in and Accounts statistics",
      description:
        "After logging in with GitHub, you can see your account statistics",
      type: "addition",
      date: "2023-02-01",
    },
    {
      title: "World Map",
      description: "See LinkFree users on a world wide map",
      type: "addition",
      date: "2023-01-24",
    },
    {
      title: "Trending page removed",
      description:
        "This page was super useful to discover people, but became less valuable as people tried to cheat the system",
      type: "removal",
      date: "2023-01-15",
    },
    {
      title: "`avatar` json property no longer required",
      description: "Now will default to using people's GitHub proile picture",
      type: "removal",
      date: "2023-01-07",
    },
  ];

  return (
    <>
      <PageHead
        title="LinkFree Search Users"
        description="Search LinkFree user directory by name, tags, skills, languages"
      />
      <Page>
        <h1 className="text-4xl mb-4 font-bold">Changelog</h1>

        <div className="overflow-hidden bg-white shadow sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {changes.map((change) => (
              <li key={change.title}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="truncate text-lg font-medium">
                      {change.title}
                    </p>
                    <div className="ml-2 flex flex-shrink-0">
                      <p
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          colors[change.type]
                        }`}
                      >
                        {change.type}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">{change.description}</div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <CalendarIcon
                        className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <p>{change.date}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Page>
    </>
  );
}
