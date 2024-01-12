import { useMemo, useState } from "react";
import * as FaIcons from "react-icons/fa6";
import * as SiIcons from "react-icons/si";

import Input from "@components/form/Input";
import Alert from "@components/Alert";
import IconCard from "@components/IconCard";
import Page from "@components/Page";
import PageHead from "@components/PageHead";
import { PROJECT_NAME } from "@constants/index";
import { useRouter } from "next/router";
import Button from "@components/Button";
import { getPopularIcons } from "./api/icons";
import Badge from "@components/Badge";
import logger from "@config/logger";

export async function getServerSideProps() {
  let popularIcons = [];

  try {
    popularIcons = await getPopularIcons();
  } catch (e) {
    logger.error(e, "Failed to load popular icons");
  }

  return {
    props: { popularIcons },
  };
}

const icons = {};

Object.keys(FaIcons).forEach((key) => {
  icons[key.toLocaleLowerCase()] = key;
});

Object.keys(SiIcons).forEach((key) => {
  icons[key.toLocaleLowerCase()] = key;
});

export default function Icons({ popularIcons }) {
  const [notFound, setNotFound] = useState();

  const router = useRouter();
  const keyword = router.query.keyword || "";
  const [threeOrMore, setThreeOrMore] = useState(
    keyword.length >= 3 ? true : false,
  );
  const [searchQuery, setSearchQuery] = useState(keyword);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery === keyword) {
      return;
    }
    if (searchQuery.length === 0)
      return router.replace({
        pathname: "/icons",
      });
    router.replace({
      pathname: "/icons",
      query: { keyword: searchQuery },
    });
  };

  const filterredIcons = useMemo(
    (value = keyword) => {
      if (value.length < 3) {
        setThreeOrMore(false);
        return popularIcons;
      }
      setThreeOrMore(true);

      const filteredIconNames = Object.keys(icons)
        .filter((icon) => icon.includes(value.toLocaleLowerCase()))
        .map((iconName) => ({ icon: icons[iconName] }));
      if (!filteredIconNames.length) {
        setNotFound(value);
        return popularIcons;
      }

      if (filteredIconNames.length) {
        setNotFound(false);
      }
      return filteredIconNames;
    },
    [keyword, popularIcons],
  );
  return (
    <>
      <PageHead
        title={`${PROJECT_NAME} Search Icons`}
        description={`Search ${PROJECT_NAME} icon directory`}
      />

      <Page>
        <h1 className="text-4xl mb-4  font-bold">Search For Icons</h1>
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Search Icons (minimum 3 characters)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            name="keyword"
          />
          <Button>Search</Button>
        </form>
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
          {filterredIcons.map((iconName, index) => (
            <li key={index}>
              <Badge
                content={iconName.count}
                display={!!iconName.count}
                badgeClassName={"translate-x-1/4 -translate-y-1/2"}
              >
                <IconCard iconName={iconName.icon} />
              </Badge>
            </li>
          ))}
        </ul>
      </Page>
    </>
  );
}
