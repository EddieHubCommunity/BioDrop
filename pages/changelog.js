import Page from "../components/Page";
import PageHead from "../components/PageHead";
import { CalendarIcon, MapPinIcon, UsersIcon } from "@heroicons/react/20/solid";

export default function Changelog() {
  const changes = [
    {
      id: 1,
      title: "World Map",
      description: "See LinkFree users on a world wide map",
      type: "feature",
      date: "2023-01-07",
    },
    {
      id: 2,
      title: "Logging in and Accounts statistics",
      description:
        "After logging in with GitHub, you can see your account statistics",
      type: "feature",
      date: "2023-02-01",
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
              <li key={change.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="truncate text-lg font-medium">
                      {change.title}
                    </p>
                    <div className="ml-2 flex flex-shrink-0">
                      <p className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
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
