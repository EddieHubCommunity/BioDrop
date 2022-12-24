import Head from "next/head";
import { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import IconCard from "../components/IconCard";
import Page from "../components/Page";

export default function Icons() {
  const [searchedIconNames, setSearchedIconNames] = useState([]);
  const [notFound, setNotFound] = useState();

  /**
   creating an icons object to map the original name of the icon as value
   the icons name are in camelCase so converting it into lowercase for searchig
   after searching we need the camelcase string to get the icon from react-icons
   eg: icons = { mdoutlinetoggleon: 'MdOutlineToggleOn'}
 */

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
      return setNotFound("Please enter at least 3 characters to search...");
    }
    const filteredIconNames = Object.keys(icons)
      .filter((icon) => icon.includes(value.toLocaleLowerCase()))
      .map((iconName) => icons[iconName]);

    setSearchedIconNames(filteredIconNames);

    if (!filteredIconNames.length) {
      return setNotFound("No Icons found");
    }

    setNotFound();
  };

  return (
    <>
      <Head>
        <title>LinkFree Search Icons</title>
        <meta name="description" content="Search LinkFree icon directory" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page>
        <h1 className="text-4xl mb-4  font-bold">Search For Icons</h1>
        <input
          placeholder="Search Icons (minimum 3 characters)"
          className="border-2 hover:border-orange-600 transition-all duration-250 ease-linear rounded px-6 py-2 "
          name="keyword"
          onChange={(e) => searchIcons(e.target.value)}
        />
        {notFound && (
          <h2 className="bg-red-200 text-red-600 border-2 border-red-600 p-5 my-5 text-xl">
            {notFound}
          </h2>
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
