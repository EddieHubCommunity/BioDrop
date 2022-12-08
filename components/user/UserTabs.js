export default function UserTabs({ tabs, setTabs }) {
  const classNames = (...classes) => classes.filter(Boolean).join(" ");
  const changeTab = (e, value) => {
    e.preventDefault();
    setTabs(
      tabs.map((tab) =>
        tab.name === value
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
          onChange={(e) => changeTab(e.target.value)}
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
          <nav className="-mb-px flex" aria-label="Tabs">
            {tabs.map((tab) => (
              <a
                key={tab.name}
                href={tab.href}
                onClick={(e) => changeTab(e, tab.name)}
                className={classNames(
                  tab.current
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                  "w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                {tab.name} ({tab.total})
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
