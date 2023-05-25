import { useState } from "react";
import dynamic from "next/dynamic";

import logger from "@config/logger";
import Tag from "@components/Tag";
import Button from "@components/Button";
import PageHead from "@components/PageHead";
import Page from "@components/Page";
import Badge from "@components/Badge";
import {getTags} from "./api/discover/tags"
import {getUsers} from "./api/users";

//this is required as leaflet is not compatible with SSR
const DynamicMap = dynamic(() => import("../components/map/Map"), {
  ssr: false,
});

export async function getStaticProps() {
  let data = {
    users: [],
    tags: [],
  };
  try {
    data.users = await getUsers();
  } catch (e) {
    logger.error(e, "ERROR search users");
  }

  data.users = data.users.filter(
    (user) =>
      user.location &&
      user.location.provided &&
      user.location.provided !== "unknown" &&
      user.location.name !== "unknown" &&
      user.location.provided.toLowerCase() !== "remote"
  );

  try {
    data.tags = await getTags();
    data.tags = data.tags.filter((tag) =>
      data.users.find((user) => user.tags && user.tags.includes(tag.name))
    );
  } catch (e) {
    logger.error(e, "ERROR loading tags");
  }

  return {
    props: { data },
    revalidate: 60 * 60 * 12, //12 hours
  };
}

export default function Map({ data }) {
  let { users, tags } = data;
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedTags, setSelectedTags] = useState(new Set());

  let results = [];

  const updateSelectedTagsFilter = (tagSelected) => {
    const updatedSelectedTags = new Set(selectedTags);

    if (updatedSelectedTags.has(tagSelected)) {
      updatedSelectedTags.delete(tagSelected);
    } else {
      updatedSelectedTags.add(tagSelected);
    }

    setSelectedTags(updatedSelectedTags);
    return updatedSelectedTags;
  };

  const filterData = (value) => {
    const valueLower = value.toLowerCase();
    const terms = [...updateSelectedTagsFilter(value)];

    results = users.filter((user) => {
      if (user.name.toLowerCase().includes(valueLower)) {
        return true;
      }

      let userTags = user.tags?.map((tag) => tag.toLowerCase());

      if (terms.every((keyword) => userTags?.includes(keyword.toLowerCase()))) {
        return true;
      }

      return false;
    });

    setFilteredUsers(results);
  };

  const resetFilter = () => {
    setFilteredUsers([]);
    setSelectedTags(new Set());
  };

  let links = [];
  for (let i = 0; i <= 3; i++) {
    for (let j = 0; j <= 3; j++) {
      links.push(<link rel="preload" as="image" key={`${i}${j}`} href={`https://b.tile.openstreetmap.org/2/${i}/${j}.png`}/>)
    }
  }

  return (
    <>
      <PageHead
        title="LinkFree Users Around The World"
        description="This map shows all the locations of LinkFree users based on the location provided in their GitHub profiles."
      >
        {links}
      </PageHead>
      <Page>
        <h1 className="text-4xl mb-4 font-bold">
          LinkFree Users Around The World
        </h1>
        <p className="py-5">
          This map shows locations of Linkfree users based on the location
          listed in their GitHub profile. New data points are added each time a
          profile is visited.
        </p>
        <div className="flex flex-wrap justify-center mb-4">
          <Badge
            disable={selectedTags.size == 0 ? true : false}
            content={
              filteredUsers.length > 0 ? filteredUsers.length : users.length
            }
          >
            <Button
              onClick={resetFilter}
              text="Clear/Reset Filters"
              primary={true}
              disable={selectedTags.size == 0 ? true : false}
            />
          </Badge>
          {tags &&
            tags
              .slice(0, 10)
              .map((tag) => (
                <Tag
                  key={tag.name}
                  name={tag.name}
                  total={tag.total}
                  selected={selectedTags.has(tag.name)}
                  onClick={() => filterData(tag.name)}
                />
              ))}
        </div>
        <div className="h-screen">
          <DynamicMap users={filteredUsers.length > 0 ? filteredUsers : users} />
        </div>
      </Page>
    </>
  );
}
