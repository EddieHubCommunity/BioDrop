import { useState } from "react";
import { Combobox } from "@headlessui/react";
import * as FaIcons from "react-icons/fa6";
import * as SiIcons from "react-icons/si";
import getIcon from "./Icon";
import Label from "./form/Label";

function IconSearch({ selectedIcon, handleSelectedIcon }) {
  const [query, setQuery] = useState("");

  const popularIcons = ["FaGithub", "FaTwitter", "FaLinkedin", "FaGit"];
  const icons = [...Object.keys(FaIcons), ...Object.keys(SiIcons)];

  const filteredIcon =
    query === ""
      ? popularIcons
      : icons
          .filter((icon) => {
            return icon.toLowerCase().includes(query.toLowerCase());
          })
          .slice(0, 5);

  return (
    <Combobox value={selectedIcon} onChange={handleSelectedIcon}>
      <Label htmlFor="search-icon">Icon</Label>
      <Combobox.Input
        name="search-icon"
        onChange={(event) => setQuery(event.target.value)}
        className={`border-2 transition-all duration-250 ease-linear rounded px-6 py-2 mb-2 block w-full dark:bg-primary-high hover:border-tertiary-medium focus:ring-0 focus:border-tertiary-medium focus:outline-0`}
      />
      <Combobox.Options
        className={`border-2 rounded border-tertiary-medium dark:bg-primary-medium`}
      >
        {filteredIcon.map((icon) => {
          const Icon = getIcon(icon);
          return (
            <Combobox.Option
              key={icon}
              value={icon}
              className={`px-3 py-2 flex items-center dark:hover:bg-tertiary-medium/60 hover:bg-secondary-low/40`}
            >
              <Icon className="h-5 w-5 mr-2 fill-grey-700 inline align-center justify-center" />{" "}
              <span>{icon}</span>
            </Combobox.Option>
          );
        })}
      </Combobox.Options>
    </Combobox>
  );
}

export default IconSearch;
