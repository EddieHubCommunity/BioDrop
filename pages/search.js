import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import UserCard from "@components/user/UserCard";
import Alert from "@components/Alert";
import Page from "@components/Page";
import PageHead from "@components/PageHead";
import Tag from "@components/Tag";
import Badge from "@components/Badge";
import logger from "@config/logger";
import Input from "@components/form/Input";
import { getTags } from "./api/discover/tags";
import { getUsers } from "./api/profiles";
import config from "@config/app.json";

export async function getStaticProps() {
  const pageConfig = config.isr.searchPage; // Fetch the specific configuration for this page
  let data = {
    tags: [],
  };
  let users = [];
  try {
    users = await getUsers({ cards: true });
  } catch (e) {
    logger.error(e, "ERROR search users");
  }

  try {
    data.tags = await getTags();
  } catch (e) {
    logger.error(e, "ERROR loading tags");
  }

  if (users.length > 5) {
    data.randUsers = users.sort(() => 0.5 - Math.random()).slice(0, 5);
  } else {
    data.randUsers = users;
  }

  return {
    props: { data },
    revalidate: pageConfig.revalidateSeconds,
  };
}

export default function Search({ data: { tags, randUsers } }) {
  const router = useRouter();
  const { username, keyword } = router.query;
  const [notFound, setNotFound] = useState();
  const [users, setUsers] = useState(randUsers);
  const [inputValue, setInputValue] = useState(username || keyword || "");

  useEffect(() => {
    if (username) {
      setNotFound(username);
    }
  }, [username]);

  useEffect(() => {
    if (!inputValue) {
      //Setting the users as null when the input field is empty
      setUsers(randUsers);
      //Removing the not found field when the input field is empty
      setNotFound();
      return;
    }

    if (inputValue.length < 2) {
      return;
    }

    async function fetchUsers(value) {
      try {
        const res = await fetch(`api/search/${value.replaceAll(",", "/")}`);
        if (!res.ok && res.status === 404)
          throw new Error(`${inputValue} not found`);
        const data = await res.json();
        setNotFound();
        setUsers(data.users.sort(() => Math.random() - 0.5));
      } catch (err) {
        setNotFound(err);
        setUsers([]);
      }
    }

    const timer = setTimeout(() => {
      fetchUsers(inputValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const search = (keyword) => {
    const cleanedInput = cleanSearchInput(inputValue);

    if (!cleanedInput.length) {
      return setInputValue(keyword);
    }

    const items = cleanedInput.split(",");

    if (cleanedInput.length) {
      if (searchTagNameInInput(inputValue, keyword)) {
        return setInputValue(
          items.filter((item) => item.trim() !== keyword).join(",")
        );
      }

      return setInputValue([...items, keyword].join(","));
    }

    setInputValue(keyword);
  };

  // removes leading/trailing whitespaces and extra spaces and converted to lowercase
  const cleanSearchInput = (searchInput) => {
    return searchInput
      .trim()
      .replace(/\s{2,}/g, " ")
      .toLowerCase();
  };

  const searchTagNameInInput = (searchInput, tagName) => {
    const tags = cleanSearchInput(searchInput).split(",");

    for (let tag of tags) {
      if (tag.trim() === tagName.toLowerCase()) {
        return true;
      }
    }

    return false;
  };

  return (
    <>
      <PageHead
        title="LinkFree Search Users"
        description="Search LinkFree user directory by name, tags, skills, languages"
      />
      <Page>
        <h1 className="text-4xl mb-4 font-bold">Search</h1>

        <div className="flex flex-wrap justify-center space-x-3 mb-4">
          {tags &&
            tags
              .slice(0, 10)
              .map((tag) => (
                <Tag
                  key={tag.name}
                  name={tag.name}
                  total={tag.total}
                  selected={searchTagNameInInput(inputValue, tag.name)}
                  onClick={() => search(tag.name)}
                />
              ))}
        </div>

        <Badge
          content={users.length}
          display={!!users}
          className="w-full"
          badgeClassName={"translate-x-2/4 -translate-y-1/2"}
        >
          <Input
            placeholder="Search user by name or tags; eg: open source,reactjs"
            name="keyword"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </Badge>

        {notFound && <Alert type="error" message={`${notFound}`} />}
        <ul className="flex flex-wrap gap-3 justify-center mt-[3rem]">
          {users.map((user) => (
            <li key={user.username}>
              <UserCard profile={user} />
            </li>
          ))}
        </ul>
      </Page>
    </>
  );
}
