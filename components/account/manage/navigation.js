import Link from "@components/Link";
import { useRouter } from "next/router";
import {
  MdPerson,
  MdOutlineAutoGraph,
  MdOutlineLink,
  MdSpeakerNotes,
  MdCalendarMonth,
  MdOutlineBadge,
} from "react-icons/md";

let tabs = [
  {
    name: "Statistics",
    href: "/account/statistics",
    match: [],
    icon: MdOutlineAutoGraph,
    current: false,
  },
  {
    name: "Profile",
    href: "/account/manage/profile",
    match: [],
    icon: MdPerson,
    current: false,
  },
  {
    name: "Links",
    href: "/account/manage/links",
    match: ["/account/manage/link/[[...data]]"],
    icon: MdOutlineLink,
    current: false,
  },
  {
    name: "Milestones",
    href: "/account/manage/milestones",
    match: ["/account/manage/milestone/[[...data]]"],
    icon: MdOutlineBadge,
    current: false,
  },
  {
    name: "Events",
    href: "/account/manage/events",
    match: [],
    icon: MdCalendarMonth,
    current: false,
  },
  {
    name: "Testimonials",
    href: "/account/manage/testimonials",
    match: [],
    icon: MdSpeakerNotes,
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navigation() {
  const router = useRouter();
  tabs = tabs.map((tab) => {
    if (router.pathname === tab.href || tab.match.includes(router.pathname)) {
      return { ...tab, current: true };
    }
    return { ...tab, current: false };
  });

  return (
    <div className="mb-6">
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          defaultValue={tabs.find((tab) => tab.current).name}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                href={tab.href}
                className={classNames(
                  tab.current
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  "group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                <tab.icon
                  className={classNames(
                    tab.current
                      ? "text-indigo-500"
                      : "text-gray-400 group-hover:text-gray-500",
                    "-ml-0.5 mr-2 h-5 w-5"
                  )}
                  aria-hidden="true"
                />
                <span>{tab.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
