import { useState } from "react";
import { Combobox } from "@headlessui/react";
import Label from "./form/Label";

function GroupLinkSearch({ selectedGroup, handleGroupSelection, groups }) {
  const [query, setQuery] = useState("");

  const filteredGroup =
    query === ""
      ? groups
      : groups
          .filter((group) => {
            return group.toLowerCase().includes(query.toLowerCase());
          })
          .slice(0, 5);

  return (
    <Combobox value={selectedGroup} onChange={handleGroupSelection}>
      <Label htmlFor="search-groups">Group</Label>
      <Combobox.Input
        name="search-group"
        onChange={(event) => setQuery(event.target.value)}
        className={`border-2 transition-all duration-250 ease-linear rounded px-6 py-2 mb-2 block w-full dark:bg-primary-high hover:border-tertiary-medium focus:ring-0 focus:border-tertiary-medium focus:outline-0`}
      />
      <Combobox.Options
        className={`border-2 rounded border-tertiary-medium dark:bg-primary-medium`}
      >
        {filteredGroup.map((group) => {
          return (
            <Combobox.Option
              key={group}
              value={group}
              className={`px-3 py-2 flex items-center dark:hover:bg-tertiary-medium/60 hover:bg-secondary-low/40`}
            >
              {group !== "" && <span>{group}</span>}
            </Combobox.Option>
          );
        })}
      </Combobox.Options>
    </Combobox>
  );
}

export default GroupLinkSearch;
