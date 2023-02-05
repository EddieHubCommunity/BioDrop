import { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";

import Alert from "../components/Alert";
import IconCard from "../components/IconCard";
import Page from "../components/Page";
import PageHead from "../components/PageHead";

export default function Icons() {
  const [searchedIconNames, setSearchedIconNames] = useState([]);
  const [notFound, setNotFound] = useState();
  const [threeOrMore, setThreeOrMore] = useState();

  const icons = {};

  Object.keys(FaIcons).forEach((key) => {
    icons[key.toLocaleLowerCase()] = key;
  });

  Object.keys(SiIcons).forEach((key) => {
    icons[key.toLocaleLowerCase()] = key;
  });

  const searchIcons = (value) => {
    setSearchedIconNames([]);
    if (value.length < 3) {
      return setThreeOrMore(false);
    }
    setThreeOrMore(true);

    const filteredIconNames = Object.keys(icons)
      .filter((icon) => icon.includes(value.toLocaleLowerCase()))
      .map((iconName) => icons[iconName]);

    if (!filteredIconNames.length) {
      return setNotFound(value);
    }

    if (filteredIconNames.length) {
      setNotFound();
    }

    setSearchedIconNames(filteredIconNames);
  };

  return (
    <>
      <PageHead
        title="LinkFree Search Icons"
        description="Search LinkFree icon directory"
      />

      <Page>
        <h1 className="text-4xl mb-4  font-bold">Search For Icons</h1>
        <input
          placeholder="Search Icons (minimum 3 characters)"
          className="border-2 hover:border-orange-600 transition-all duration-250 ease-linear rounded px-6 py-2 mb-4"
          name="keyword"
          onChange={(e) => searchIcons(e.target.value)}
        />
        {threeOrMore && notFound && (
          <Alert type="error" message={`${notFound} not found`} />
        )}
        {!threeOrMore && (
          <Alert
            type="info"
            message="You have to enter at least 3 characters to search for an icon."
          />
        )}
        <ul className="flex flex-wrap gap-4 mt-4">
          {searchedIconNames.map((iconName, index) => (
            <li key={index}>
              <IconCard iconName={iconName} />
            </li>
          ))}
        </ul>
      </Page>
    </>
  );
}
