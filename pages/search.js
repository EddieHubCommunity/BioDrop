import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

import UserCard from "../components/user/UserCard";
import Alert from "../components/Alert";
import Page from "../components/Page";
import PageHead from "../components/PageHead";

export async function getServerSideProps(context) {
  let users = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`);
    users = await res.json();
  } catch (e) {
    console.log("ERROR search users", e);
  }

  return {
    props: { users },
  };
}

export default function Search({ users }) {
  const router = useRouter();
  const inputRef = useRef();
  const { username, search } = router.query;
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [notFound, setNotFound] = useState();
  const [threeOrMore, setThreeOrMore] = useState();
  const [inputValue, setInputValue] = useState(
    username ? username : search ? search : ""
  );

  let results = [];

  useEffect(() => {
    inputRef.current.focus();
    if (username) {
      setNotFound(username);
      setThreeOrMore(false);
    }
  }, [username]);

  const filterData = (value) => {
    if (value.length <= 3) {
      setThreeOrMore(false);
      setFilteredUsers(results);
      setNotFound();
    }

    if (value.length >= 3) {
      setThreeOrMore(true);
      results = users.filter((user) => {
        if (user.name.toLowerCase().includes(value.toLowerCase())) {
          return true;
        }

        let tag = user.tags?.find((tag) =>
          tag.toLowerCase().includes(value.toLowerCase())
        );
        if (tag) {
          return true;
        }
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

        <div className="relative">
          <input
            placeholder="Search users,tags or languages"
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
            message="You have to enter at least 3 characters to search for a user."
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
