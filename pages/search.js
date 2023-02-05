import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

import UserCard from "../components/user/UserCard";
import Alert from "../components/Alert";
import Page from "../components/Page";
import PageHead from "../components/PageHead";
import Tag from "../components/Tag";

export async function getServerSideProps(context) {
  let data = {
    users: [],
    tags: [],
  };
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`);
    data.users = await res.json();
  } catch (e) {
    console.log("ERROR search users", e);
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/discover/tags`
    );
    data.tags = await res.json();
  } catch (e) {
    console.log("ERROR loading tags", e);
  }

  return {
    props: { data },
  };
}

export default function Search({ data }) {
  let { users, tags } = data;
  const router = useRouter();
  const inputRef = useRef();
  const { username, keyword } = router.query;
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [notFound, setNotFound] = useState();
  const [threeOrMore, setThreeOrMore] = useState();
  const [inputValue, setInputValue] = useState(username || keyword || "");

  let results = [];

  useEffect(() => {
    inputRef.current.focus();
    if (username) {
      setNotFound(username);
      setThreeOrMore(false);
    }
  }, [username]);

  const filterData = (value) => {
    const valueLower = value.toLowerCase();
    const terms = valueLower.split(",");
    if (value.length < 3) {
      setThreeOrMore(false);
      setFilteredUsers(results);
      setNotFound();
    }

    if (value.length >= 3) {
      setThreeOrMore(true);
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

      setFilteredUsers(results);
    }
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
    if (inputValue) {
      filterData(inputValue);
    }
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
                    .toLowerCase().split(',')
                    .includes(tag.name.toLowerCase())}
                  onClick={() => search(tag.name)}
                />
              ))}
        </div>

        <div className="relative">
          <input
            placeholder="Search user by name or tags; eg: open source,reactjs"
            ref={inputRef}
            className="border-2 hover:border-orange-600 transition-all duration-250 ease-linear rounded px-6 py-2 mb-4 block w-full"
            name="keyword"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          {filteredUsers && (
            <div className="absolute inline-block top-0 right-0 bottom-auto left-auto translate-x-1/4 -translate-y-1/3 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 py-1 px-1.5 text-xs leading-none text-center whitespace-nowrap align-baseline font-bold bg-orange-600 text-black rounded-full z-10">
              {filteredUsers.length}
            </div>
          )}
        </div>

        {notFound && <Alert type="error" message={`${notFound} not found`} />}

        {!threeOrMore && (
          <Alert
            type="info"
            message="You have to enter at least 3 characters to search for users,tags or languages."
          />
        )}
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
