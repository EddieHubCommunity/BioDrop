import Head from "next/head";
import { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import IconCard from "../components/iconCard";

export default function Search() {
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

  Object.keys(MdIcons).forEach((key) => {
    icons[key.toLocaleLowerCase()] = key;
  });

  const searchIcons = (value) => {
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
      <div className="flex flex-col px-20 pt-10 align-center">
        {notFound && (
          <h2 className="bg-red-200 text-red-600 border-2 border-red-600 p-5 my-5 text-xl">
            {notFound} not found
          </h2>
        )}
        <h1 className="text-4xl mb-4  font-bold">Search For Icons</h1>
        <input
          placeholder="Search Icons (minimum 3 characters)"
          className="border-2 hover:border-orange-600 transition-all duration-250 ease-linear rounded px-6 py-2 "
          name="keyword"
          onChange={(e) => searchIcons(e.target.value)}
        />
        <ul className="flex flex-wrap gap-5">
          {searchedIconNames.map((iconName, index) => (
            <li key={index}>
              <IconCard iconName={iconName} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
