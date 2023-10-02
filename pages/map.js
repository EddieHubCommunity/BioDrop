import { useState } from "react";
import dynamic from "next/dynamic";

import logger from "@config/logger";
import Tag from "@components/tag/Tag";
import Button from "@components/Button";
import PageHead from "@components/PageHead";
import Page from "@components/Page";
import Badge from "@components/Badge";
import { getTags } from "./api/discover/tags";
import { getProfiles } from "./api/profiles";
import config from "@config/app.json";
import { PROJECT_NAME } from "@constants/index";

//this is required as leaflet is not compatible with SSR
const DynamicMap = dynamic(() => import("../components/map/Map"), {
  ssr: false,
});

export async function getStaticProps() {
  const pageConfig = config.isr.mapPage; // Fetch the specific configuration for this page
  let data = {
    users: [],
    tags: [],
  };
  try {
    data.users = await getProfiles();
  } catch (e) {
    logger.error(e, "ERROR search users");
  }

  data.users = data.users.filter(
    (user) =>
      user.location &&
      user.location.provided &&
      user.location.provided !== "unknown" &&
      user.location.name !== "unknown" &&
      user.location.provided.toLowerCase() !== "remote",
  );

  // Apply offset equally to 4 quadrants arround point
  const adjustCoords = (coords, offset, offset2, index) => {
    switch (index % 4) {
      case 0:
        return [coords[0] + offset, coords[1] + offset2];
      case 1:
        return [coords[0] - offset, coords[1] + offset2];
      case 2:
        return [coords[0] - offset, coords[1] - offset2];
      default:
        return [coords[0] + offset, coords[1] - offset2];
    }
  };

  data.users = data.users.map((user, index) => {
    const offset = Math.random() * 0.02; // ~2.2km
    const offset2 = Math.random() * 0.02; // ~2.2km
    return {
      type: "Feature",
      properties: {
        cluster: false,
        tags: user.tags || [],
        username: user.username,
        name: user.name,
        location: user.location.provided,
        bio: user.bio || "",
      },
      geometry: {
        type: "Point",
        coordinates: adjustCoords(
          [parseFloat(user.location.lon), parseFloat(user.location.lat)],
          offset,
          offset2,
          index,
        ),
      },
    };
  });

  try {
    data.tags = await getTags(true);
  } catch (e) {
    logger.error(e, "ERROR loading tags");
  }

  return {
    props: { data },
    revalidate: pageConfig.revalidateSeconds,
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
      if (user.properties.name.toLowerCase().includes(valueLower)) {
        return true;
      }

      let userTags = user.properties.tags?.map((tag) => tag.toLowerCase());

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
      links.push(
        <link
          rel="preload"
          as="image"
          key={`${i}${j}`}
          href={`https://b.tile.openstreetmap.org/2/${i}/${j}.png`}
        />,
      );
    }
  }

  return (
    <>
      <PageHead
        title={PROJECT_NAME + " Users Around The World"}
        description={`This map shows all the locations of ${PROJECT_NAME} users based on the location provided in their GitHub profiles.`}
      >
        {links}
      </PageHead>
      <Page>
        <h1 className="text-4xl mb-4 font-bold">
          {PROJECT_NAME} Users Around The World
        </h1>
        <p className="py-5">
          This map shows locations of {PROJECT_NAME} users based on the location
          listed in their GitHub profile. New data points are added each time a
          profile is visited.
        </p>
        <div className="flex flex-wrap justify-center mb-4">
          <Badge
            disable={selectedTags.size == 0 ? true : false}
            content={
              filteredUsers.length > 0 ? filteredUsers.length : users.length
            }
            badgeClassName={"translate-x-3 -translate-y-3"}
          >
            <Button
              onClick={resetFilter}
              primary={true}
              disable={selectedTags.size == 0 ? true : false}
            >
              Clear/Reset Filters
            </Button>
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
        <div style={{ height: "min(96vw, 100vh)" }}>
          <DynamicMap
            users={filteredUsers.length > 0 ? filteredUsers : users}
          />
        </div>
      </Page>
    </>
  );
}
