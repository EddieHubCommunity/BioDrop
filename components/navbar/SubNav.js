import Link from "@components/Link";
import Select from "@components/form/Select";
import Router, { useRouter } from "next/router";
import { classNames } from "utils/functions/classNames";

export default function SubNav({ tabs }) {
  const router = useRouter();
  tabs = tabs.map((tab) => {
    if (router.pathname === tab.href || tab.match.includes(router.pathname)) {
      return { ...tab, current: true };
    }
    return { ...tab, current: false };
  });

  const changeTab = (e) =>
    Router.push(tabs.find((tab) => tab.name === e.target?.value).href);

  return (
    <div className="mb-6">
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <Select
          id="tabs"
          value={tabs.find((tab) => tab.current).name}
          label="Select a tab"
          options={tabs.map((tab) => ({ label: tab.name, value: tab.name }))}
          className="block w-full rounded-md 
          border-primary-low-medium/30 dark:border-primary-low-medium
          dark:text-primary-low
          dark:bg-primary-medium
          focus:border-secondary-medium-low focus:ring-secondary-medium-low"
          onChange={changeTab}
        />
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-primary-low-medium/30">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                href={tab.href}
                className={classNames(
                  tab.current
                    ? "border-secondary-medium-low text-secondary-medium dark:text-secondary-low-high"
                    : "border-transparent text-primary-medium-low dark:text-primary-low-high hover:border-primary-low hover:text-primary-medium dark:hover:text-primary-low",
                  "group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                <tab.icon
                  className={classNames(
                    tab.current
                      ? "text-secondary-medium-low dark:text-secondary-low-high"
                      : "text-primary-medium-low group-hover:text-primary-medium dark:group-hover:text-primary-low ",
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
