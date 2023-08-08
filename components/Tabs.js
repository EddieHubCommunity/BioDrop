import Link from "@components/Link";
import Select from "@components/form/Select";
import { classNames } from "utils/functions/classNames";
export default function Tabs({ tabs, setTabs }) {
  const changeTab = (e, value) => {
    e.preventDefault();
    setTabs(
      tabs.map((tab) =>
        tab.name === e.target?.value || tab.name === value
          ? { ...tab, current: true }
          : { ...tab, current: false }
      )
    );
  };

  return (
    <div>
      <div className="sm:hidden">
        {tabs.length > 1 && (
          <Select
            name="tabs"
            value={tabs.find((tab) => tab.current).name}
            label="Select a tab"
            onChange={changeTab}
            className="block w-full rounded-md border-primary-medium-low dark:bg-primary-medium focus:border-secondary-medium focus:ring-secondary-medium"
            options={tabs.map((tab) => ({ label: tab.name, value: tab.name }))}
          />
        )}
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-primary-medium-low">
          <nav className="-mb-px flex" aria-label="Tabs">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                href={tab.href}
                onClick={(e) => changeTab(e, tab.name)}
                className={classNames(
                  tab.current
                    ? "border-secondary-high dark:border-secondary-low text-secondary-high dark:text-secondary-low"
                    : "border-transparent text-primary-medium dark:text-primary-low-high dark:hover:text-primary-low  hover:text-primary-high hover:border-primary-medium-low",
                  "w-1/4 py-4 px-1 text-center border-b-2 font-medium text-base"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                {tab.name} ({tab.total})
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
