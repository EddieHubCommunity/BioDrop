import { BiSortAlt2 } from "react-icons/bi";
import Link from "../Link";

export default function UserTabs({ tabs, setTabs, setUserData, userData }) {
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

  const getDataKeyAndSortKey = (tabName) => {
    let dataKeyObj = {};
    switch (tabName) {
      case "Events":
        dataKeyObj.dataKey = "events";
        dataKeyObj.sortKey = "date.start";
        break;
      case "Testimonials":
        dataKeyObj.dataKey = "testimonials";
        dataKeyObj.sortKey = "date";
        break;
      case "Milestones":
        dataKeyObj.dataKey = "milestones";
        dataKeyObj.sortKey = "date";
        break;
      default:
        dataKeyObj.dataKey = "links";
        dataKeyObj.sortKey = "name";
    }
    return dataKeyObj;
  };

  const sortUserTabItems = (tabName, order) => {
    const { dataKey, sortKey } = getDataKeyAndSortKey(tabName);
    userData[dataKey].sort(function (a, b) {
      const aVal = sortKey.includes(".")
        ? getNested(a, sortKey.split("."))
        : a[sortKey];
      const bVal = sortKey.includes(".")
        ? getNested(b, sortKey.split("."))
        : b[sortKey];
      if (tabName === "My Links") {
        if (order === "ASC") {
          return aVal.toLowerCase() > bVal.toLowerCase()
            ? 1
            : aVal.toLowerCase() < bVal.toLowerCase()
            ? -1
            : 0;
        } else {
          return aVal.toLowerCase() < bVal.toLowerCase()
            ? 1
            : aVal.toLowerCase() > bVal.toLowerCase()
            ? -1
            : 0;
        }
      } else {
        if (order === "ASC") {
          return new Date(aVal) > new Date(bVal)
            ? 1
            : new Date(aVal) < new Date(bVal)
            ? -1
            : 0;
        } else {
          return new Date(aVal) < new Date(bVal)
            ? 1
            : new Date(aVal) > new Date(bVal)
            ? -1
            : 0;
        }
      }
    });
    setUserData({ ...userData });
  };

  const getNested = (obj, args) => {
    return args.reduce((obj, level) => obj && obj[level], obj);
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
              <Link
                key={tab.name}
                href={tab.href}
                onClick={(e) => changeTab(e, tab.name)}
                className={classNames(
                  tab.current
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                  "w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm flex justify-center items-center gap-4"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                <span>
                  {tab.name} ({tab.total})
                </span>
                {tab.current && (
                  <BiSortAlt2
                    size="20"
                    className="hover:text-gray-400"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setTabs(
                        tabs.map((tab) =>
                          tab.current
                            ? {
                                ...tab,
                                order: tab.order === "ASC" ? "DESC" : "ASC",
                              }
                            : { ...tab }
                        )
                      );
                      sortUserTabItems(
                        tab.name,
                        tab.order === "ASC" ? "DESC" : "ASC"
                      );
                    }}
                  />
                )}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
