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
import { getUsers } from "./api/users";

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

  try {
    data.tags = await getTags();
  } catch (e) {
    logger.error(e, "ERROR loading tags");
  }

  return {
    props: { data },
    revalidate: 60 * 60 * 2, //2 hours
  };
}

export default function Search({ data }) {
  let { users, tags } = data;
  const router = useRouter();
  const { username, keyword } = router.query;
  const [notFound, setNotFound] = useState();

  const [filteredUsers, setFilteredUsers] = useState([]);
  const [inputValue, setInputValue] = useState(username || keyword || "");
  let results = [];

  const getRandomUsers = () => {
    return users.sort(() => 0.5 - Math.random()).slice(0, 5);
  };

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
      if (user.username.toLowerCase().includes(valueLower)) {
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
      //Setting the users as null when the input field is empty
      setFilteredUsers(getRandomUsers());
      //Removing the not found field when the input field is empty
      setNotFound();
      return;
    }

    if (inputValue.length < 2) {
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

        <div className="flex flex-wrap justify-center space-x-3 mb-4">
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
