import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import UserPreview from "../components/user/UserPreview";
import app from "../config/app.json";

export async function getServerSideProps(context) {
  let users = [];
  try {
    const res = await fetch(`${app.baseUrl}/api/users`);
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
  const { username } = router.query;
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [notFound, setNotFound] = useState();

  useEffect(() => {
    if (username) {
      setNotFound(username);
    }
  }, [username]);

  const filterData = (value) => {
    if (value.length <= 3) {
      setNotFound();
    }

    if (value.length >= 3) {
      const results = users.filter((user) =>
        user.name.toLowerCase().includes(value.toLowerCase())
      );

      if (!results.length) {
        setNotFound(value);
      }

      if (results.length) {
        setNotFound();
      }

      setFilteredUsers(results);
    }
  };

  return (
    <>
      <Head>
        <title>LinkFree Search Users</title>
        <meta name="description" content="Search LinkFree user directory" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col px-6 align-center">
        {notFound && (
          <h2 className="bg-red-200 text-red-600 border-2 border-red-600 p-5 my-5 text-xl">
            {notFound} not found
          </h2>
        )}
        <h1 className="text-4xl mb-4  font-bold">Search</h1>
        <input
          placeholder="Search users (minimum 3 characters)"
          className="border-2 hover:border-orange-600 transition-all duration-250 ease-linear rounded px-6 py-2"
          name="keyword"
          onChange={(e) => filterData(e.target.value)}
        />
        <ul>
          {filteredUsers.map((user) => (
            <li key={user.username}>
              <UserPreview profile={user} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
