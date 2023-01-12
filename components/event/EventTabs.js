export function EventTabs({ tabs, setTabs, sortEvents, setSortEvents }) {
  const classNames = (...classes) => classes.filter(Boolean).join(" ");
  const changeTab = (e, value) => {
    e.preventDefault();
    setTabs(
      tabs.map((tab) =>
        tab.title === e.target?.value || tab.title === value
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
        <select
          id="tabs"
          name="tabs"
          onChange={changeTab}
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          defaultValue={tabs.find((tab) => tab.current)?.title}
        >
          {tabs.map((tab) => (
            <option key={tab.key}>{tab.title}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex" aria-label="Tabs">
            {tabs.map((tab) => (
              <a
                key={tab.key}
                href={tab.href}
                onClick={(e) => changeTab(e, tab.title)}
                className={classNames(
                  tab.current
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                  "w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm flex justify-center items-center gap-2 cursor-pointer"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                {
                  <tab.icon
                    className={`${
                      tab.key === "all" || tab.key === "cfpOpen"
                        ? "text-lg"
                        : "text-xl"
                    }`}
                  />
                }
                <span>
                  {tab.title} ({tab.total})
                </span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
