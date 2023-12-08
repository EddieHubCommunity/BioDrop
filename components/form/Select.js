import { Fragment } from "react";
import { classNames } from "@services/utils/classNames";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

export default function Select({
  value,
  onChange,
  options = [],
  label,
  name,
  className,
  ...restProps
}) {
  const displayName = options.filter((item) => {
    return item.label.toLocaleLowerCase().includes(value);
  })[0]?.label;

  return (
    <Listbox onChange={onChange} defaultValue={value} {...restProps}>
      <div className="w-auto relative">
        {label && (
          <Listbox.Label
            className={classNames(
              "capitalize font-normal block",
              className?.includes("text-center") && "text-center",
            )}
          >
            {label}
          </Listbox.Label>
        )}
        <Listbox.Button
          className={classNames(
            "relative w-full cursor-pinter mt-[6px] rounded-sm capitalize bg-white dark:bg-primary-medium py-2 pl-3 pr-10 text-left font-medium focus:outline-none border-2 focus:border-tertiary-medium sm:text-sm",
            className,
          )}
        >
          <span className="block truncate">{displayName ?? value}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            className="select_scroll absolute z-40 mt-2 max-h-60 w-full overflow-auto rounded-sm bg-white dark:bg-primary-medium py-2 text-base shadow-xl border-2 dark:border-primary-medium-low focus:outline-none sm:text-sm"
            id={name}
          >
            {options.map((option) => (
              <Listbox.Option
                key={option.value}
                value={option.value}
                className="relative cursor-pointer select-none py-2 pl-10 pr-4 font-medium text-gray-700 dark:text-white capitalize hover:bg-primary-low dark:hover:bg-primary-medium-low duration-300"
              >
                {({ selected }) => (
                  <>
                    <span
                      className={classNames(
                        "block truncate",
                        selected ? "font-medium" : "font-normal",
                      )}
                    >
                      {option.label || option}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-tertiary-medium">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
