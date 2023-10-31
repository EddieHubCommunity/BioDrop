import { useLayoutEffect, useRef, useState } from "react";
import * as FaIcons from "react-icons/fa6";
import * as SiIcons from "react-icons/si";
import Input from "@components/form/Input";
import Alert from "@components/Alert";
import IconCard from "@components/IconCard";
import Page from "@components/Page";
import PageHead from "@components/PageHead";
import { PROJECT_NAME } from "@constants/index";
import { useRouter } from "next/router";

const icons = {};

Object.keys(FaIcons).forEach((key) => {
  icons[key.toLocaleLowerCase()] = key;
});

Object.keys(SiIcons).forEach((key) => {
  icons[key.toLocaleLowerCase()] = key;
});

const popularIcons = [
  "FaGithub",
  "FaTwitter",
  "FaLinkedin",
  "FaGit",
  "FaXTwitter",
  "FaInstagram",
  "SiHashnode",
  "FaLink",
  "FaYoutube",
  "FaGlobe",
  "FaDev",
  "FaDiscord",
  "FaMedium",
  "SiMedium",
  "FaFacebook",
  "FaGithubAlt",
  "SiLinkedin",
  "SiLeetcode",
  "FaDollarSign",
  "FaMastodon",
];

export default function Icons() {
  const [searchedIconNames, setSearchedIconNames] = useState([]);
  const [notFound, setNotFound] = useState();
  const searchInputRef = useRef(null);

  const router = useRouter();
  const [threeOrMore, setThreeOrMore] = useState(
    router.query.keyword?.length >= 3 ? true : false,
  );
  const keyword = router.query.keyword || "";

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

  useLayoutEffect(() => {
    searchIcons(keyword);
    searchInputRef?.current.focus();
  }, [keyword]);

  return (
    <>
      <PageHead
        title={`${PROJECT_NAME} Search Icons`}
        description={`Search ${PROJECT_NAME} icon directory`}
      />

      <Page>
        <h1 className="text-4xl mb-4  font-bold">Search For Icons</h1>
        <Input
          placeholder="Search Icons (minimum 3 characters)"

          name="keyword"
          onChange={(e) => {
            if (e.currentTarget.value.length === 0)
              return router.replace({
                pathname: "/icons",
              });
            router.replace({
              pathname: "/icons",
              query: { keyword: e.currentTarget.value },
            });
          }}
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
          {(searchedIconNames.length ? searchedIconNames : popularIcons).map(
            (iconName, index) => (
              <li key={index}>
                <IconCard iconName={iconName} />
              </li>
            ),
          )}
        </ul>
      </Page>
    </>
  );
}
