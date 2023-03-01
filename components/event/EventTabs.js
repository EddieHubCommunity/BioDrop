import Link from "../Link";

export function EventTabs({ tabs, eventType, setEventType }) {
  const classNames = (...classes) => classes.filter(Boolean).join(" ");
  const changeTab = (e, value) => {
    e.preventDefault();
    setEventType(value);
    if (!value) {
      setEventType(tabs.find((tab) => tab.title === e.target.value).key);
    }
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
          onChange={(e) => changeTab(e)}
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          defaultValue={tabs.find((tab) => tab.key === eventType)?.title}
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
              <Link
                key={tab.key}
                href=""
                onClick={(e) => changeTab(e, tab.key)}
                className={classNames(
                  tab.key === eventType
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                  "w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm flex justify-center items-center gap-2 cursor-pointer"
                )}
                aria-current={tab.key === eventType ? "page" : undefined}
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
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
