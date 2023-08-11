import { Combobox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid";
import { classNames } from "@services/utils/classNames";
import { useEffect, useState } from "react";

export default function InputDropDown({
  label,
  name,
  group,
  setGroup,
  linkGroups,
  ...inputProps
}) {
  const [filteredLinkGroups, setFilteredLinkGroups] = useState(linkGroups);
  useEffect(() => {
    if (group === "") setFilteredLinkGroups(linkGroups);

    setFilteredLinkGroups(() =>
      linkGroups.filter((_group) =>
        _group
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(group.toLowerCase().replace(/\s+/g, ""))
      )
    );
  }, [group, linkGroups]);

  return (
    <div className="relative">
      {label && (
        <label htmlFor={name} className="mt-4 mb-3">
          {label}
        </label>
      )}
      <Combobox value={group} onChange={setGroup}>
        <div className="relative">
          <Combobox.Input
            name={name}
            {...inputProps}
            onChange={(e) => setGroup(e.target.value)}
            className={`border-2 transition-all duration-250 ease-linear rounded px-6 py-2 mb-2 block w-full 
        dark:bg-primary-high hover:border-tertiary-medium focus:ring-0 focus:border-tertiary-medium focus:outline-0
    `}
          />

          <Combobox.Button className="absolute top-1/2 -translate-y-1/2 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
        <Combobox.Options
          className="bg-white absolute border-2 transition-all duration-250 ease-linear rounded mb-2 block w-full 
        dark:bg-primary-high focus:ring-0 focus:border-tertiary-medium focus:outline-0 border-tertiary-medium"
        >
          {filteredLinkGroups.map((_group, index) => (
            <Combobox.Option
              key={index}
              value={_group}
              className={`cursor-pointer`}
            >
              {({ active, selected }) => (
                <span
                  className={classNames(
                    active ? "bg-secondary-low dark:bg-secondary-high" : "",
                    selected
                      ? "grid grid-cols-[auto_15px] gap-x-2 items-center"
                      : "",
                    "px-6 py-2 hover:bg-secondary-low dark:hover:bg-secondary-high block my-3"
                  )}
                >
                  {_group}
                  {selected && <CheckIcon className="w-5" />}
                </span>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
}
