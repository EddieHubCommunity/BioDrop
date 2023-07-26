import Link from "@components/Link";
import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

export default function Tabs({ tabs, setTabs }) {
  const classNames = (...classes) => classes.filter(Boolean).join(" ");
  const changeTab = (value) => {
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
      {tabs.length > 1 && (
        <Listbox
          as="div"
          defaultValue={tabs.find((tab) => tab.current).name}
          className="w-full sm:hidden mt-6 mb-8"
        >
          <Listbox.Label className="sr-only"> Select a tab</Listbox.Label>
          <div className="relative w-full">
            <Listbox.Button className="truncate flex items-center justify-between w-full cursor-pointer rounded-md bg-slate-300 dark:bg-primary-medium py-[10px] pl-4 pr-2 sm:text-sm text-[16px] font-semibold focus:ring-2 ring-secondary-medium dark:ring-secondary-low ring-offset-2 ring-offset-primary-low dark:ring-offset-primary-high duration-200">
              {tabs.find((tab) => tab.current).name}
              <ChevronUpDownIcon
                className="h-5 w-5 text-primary-high dark:text-primary-low opacity-70 pointer-events-none"
                aria-hidden="true"
              />
            </Listbox.Button>

            <Listbox.Options className="absolute z-40 mt-1 max-h-60 w-full mx-auto overflow-auto py-1 rounded-md bg-slate-300 dark:bg-primary-medium shadow-lg shadow-primary-low-medium dark:shadow-primary-high focus:outline-none text-sm">
              {tabs.map((option) => (
                <Listbox.Option
                  key={option.name}
                  value={option.name}
                  onClick={() => changeTab(option.name)}
                  className={({ active }) =>
                    classNames(
                      active &&
                        "bg-primary-low dark:bg-primary-high dark:opacity-70",
                      "relative cursor-default select-none my-[2px] py-[10px] pl-10 pr-4 duration-200"
                    )
                  }
                >
                  {({ selected }) => (
                    <>
                      <p
                        className={classNames(
                          selected && "!font-bold dark:font-semibold",
                          "block truncate dark:text-primary-low font-medium dark:font-normal"
                        )}
                      >
                        {option.name}
                      </p>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-tertiary-medium">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      )}

      <div className="hidden sm:block">
        <div className="border-b border-primary-medium-low">
          <nav className="-mb-px flex" aria-label="Tabs">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                href={tab.href}
                onClick={() => changeTab(tab.name)}
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
