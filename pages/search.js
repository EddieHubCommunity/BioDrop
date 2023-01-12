import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import UserCard from "../components/user/UserCard";
import Alert from "../components/Alert";
import Page from "../components/Page";

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
  const { username, search } = router.query;
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [notFound, setNotFound] = useState();
  const [threeOrMore, setThreeOrMore] = useState();
  const [inputValue, setInputValue] = useState(
    username ? username : search ? search : ""
  );

  let results = [];

  useEffect(() => {
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
      <Head>
        <title>LinkFree Search Users</title>
        <meta name="description" content="Search LinkFree user directory" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page>
        <h1 className="text-4xl mb-4 font-bold">Search</h1>
        <input
          placeholder="Search users"
          className="border-2 hover:border-orange-600 transition-all duration-250 ease-linear rounded px-6 py-2 mb-4"
          name="keyword"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
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
