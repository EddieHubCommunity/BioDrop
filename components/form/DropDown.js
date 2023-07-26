import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

export default function DropdownMenu({
  eventType,
  setEventType,
  options,
  label,
  className,
}) {
  const classNames = (...classes) => classes.filter(Boolean).join(" ");
  return (
    <Listbox
      as="div"
      defaultValue={eventType}
      className="w-full mx-auto sm:mt-8 sm:mb-12 mb-10 flex sm:flex-row flex-col items-center sm:space-x-5 justify-center"
    >
      <Listbox.Label className={className}>{label}</Listbox.Label>
      <div className="relative">
        <Listbox.Button className="truncate flex items-center justify-between sm:w-64 w-60 cursor-pointer rounded-md bg-slate-300 dark:bg-primary-medium py-[10px] pl-4 pr-2 sm:text-sm text-xs font-semibold focus:ring-2 ring-secondary-medium dark:ring-secondary-low ring-offset-2 ring-offset-primary-low dark:ring-offset-primary-high duration-200">
          {
            options.filter((option) =>
              option.name.toLowerCase().includes(eventType)
            )?.[0].name
          }
          <ChevronUpDownIcon
            className="h-5 w-5 text-primary-high dark:text-primary-low opacity-70 pointer-events-none"
            aria-hidden="true"
          />
        </Listbox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-30 mt-1 max-h-60 sm:w-64 w-60 mx-auto overflow-auto py-1 rounded-md bg-slate-300 dark:bg-primary-medium shadow-lg shadow-primary-low-medium dark:shadow-primary-high focus:outline-none sm:text-sm text-xs">
            {options.map((option) => (
              <Listbox.Option
                key={option.value}
                value={option.value ?? eventType}
                onClick={() => setEventType(option.value)}
                className={({ active }) =>
                  classNames(
                    active &&
                      "bg-primary-low dark:bg-primary-high dark:opacity-70",
                    "relative cursor-default select-none my-[2px] py-2 pl-10 pr-4 duration-200"
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
                        <CheckIcon
                          className="sm:h-5 h-4 sm:w-5 w-4"
                          aria-hidden="true"
                        />
                      </span>
                    )}
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
