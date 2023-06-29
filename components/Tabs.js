import Link from "@components/Link";

export default function Tabs({ tabs, setTabs }) {
  const classNames = (...classes) => classes.filter(Boolean).join(" ");
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
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {tabs.length > 1 && (
          <select
            id="tabs"
            name="tabs"
            onChange={changeTab}
            className="block w-full rounded-md border-primary-medium-low dark:bg-primary-medium focus:border-secondary-medium focus:ring-secondary-medium"
            defaultValue={tabs.find((tab) => tab.current).name}
          >
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
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
