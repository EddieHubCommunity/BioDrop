import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

import { UserCard, Alert, Page, PageHead, Tag, Badge, Input } from "@components";
import logger from "@config/logger";


export async function getServerSideProps(context) {
  let data = {
    users: [],
    tags: [],
  };
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`);
    data.users = await res.json();
  } catch (e) {
    logger.error(e, "ERROR search users");
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/discover/tags`
    );
    data.tags = await res.json();
  } catch (e) {
    logger.error(e, "ERROR loading tags");
  }

  return {
    props: { data },
  };
}

export default function Search({ data }) {
  let { users, tags } = data;
  const router = useRouter();
  const { username, keyword } = router.query;
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [notFound, setNotFound] = useState();
  const [inputValue, setInputValue] = useState(username || keyword || "");

  let results = [];

  useEffect(() => {
    if (username) {
      setNotFound(username);
    }
  }, [username]);

  const filterData = (value) => {
    const valueLower = value.toLowerCase();
    const terms = valueLower.split(",");

    results = users.filter((user) => {
      if (user.name.toLowerCase().includes(valueLower)) {
        return true;
      }

      let userTags = user.tags?.map((tag) => tag.toLowerCase());

      if (terms.every((keyword) => userTags?.includes(keyword))) {
        return true;
      }

      return false;
    });

    if (!results.length) {
      setNotFound(value);
    }

    if (results.length) {
      setNotFound();
    }

    setFilteredUsers(results.sort(() => Math.random() - 0.5));
  };

  const search = (keyword) => {
    if (!inputValue.length) {
      return setInputValue(keyword);
    }

    const items = inputValue.split(",");
    if (inputValue.length) {
      if (items.includes(keyword)) {
        return setInputValue(
          items.filter((item) => item !== keyword).join(",")
        );
      }

      return setInputValue([...items, keyword].join(","));
    }

    setInputValue(keyword);
  };

  useEffect(() => {
    if (!inputValue) {
      return;
    }

    const timer = setTimeout(() => {
      filterData(inputValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue]);

  return (
    <>
      <PageHead
        title="LinkFree Search Users"
        description="Search LinkFree user directory by name, tags, skills, languages"
      />
      <Page>
        <h1 className="text-4xl mb-4 font-bold">Search</h1>

        <div className="flex flex-wrap justify-center mb-4">
          {tags &&
            tags
              .slice(0, 10)
              .map((tag) => (
                <Tag
                  key={tag.name}
                  name={tag.name}
                  total={tag.total}
                  selected={inputValue
                    .toLowerCase()
                    .split(",")
                    .includes(tag.name.toLowerCase())}
                  onClick={() => search(tag.name)}
                />
              ))}
        </div>

        <Badge
          content={filteredUsers.length}
          display={!!filteredUsers}
          className="w-full"
          badgeClassName={"translate-x-2/4 -translate-y-1/2"}
        >
          <Input
            placeholder="Search user by name or tags; eg: open source,reactjs"
            className="border-2 hover:border-orange-600 transition-all duration-250 ease-linear rounded px-6 py-2 mb-4 block w-full"
            name="keyword"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </Badge>

        {notFound && <Alert type="error" message={`${notFound} not found`} />}
        <ul className="flex flex-wrap gap-3 justify-center mt-[3rem]">
          {filteredUsers.map((user) => (
            <li key={user.username}>
              <UserCard profile={user} />
            </li>
          ))}
        </ul>
      </Page>
    </>
  );
}
