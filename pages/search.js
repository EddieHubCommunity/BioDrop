import Head from "next/head";
import { useState } from "react";

import UserPreview from "../components/user/UserPreview";
import app from "../config/app.json";

export async function getServerSideProps(context) {
  let users = [];
  try {
    const res = await fetch(`${app.baseUrl}/api/users`);
    users = await res.json();
  } catch (e) {
    console.log(e);
  }

  return {
    props: { users },
  };
}

export default function Search({ users }) {
  const [filteredUsers, setFilteredUsers] = useState(users);
  console.log(users.length);
  const filterData = (value) => {
    setFilteredUsers(
      value.length
        ? users.filter((user) =>
            user.name.toLowerCase().includes(value.toLowerCase())
          )
        : users
    );
  };
  return (
    <>
      <Head>
        <title>LinkFree Search Users</title>
        <meta name="description" content="Search LinkFree user directory" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-3xl font-bold underline">Search</h1>
      <input
        placeholder="Search users"
        className="border-2 border-sky-500 rounded"
        name="keyword"
        onChange={(e) => filterData(e.target.value)}
      />
      <ul>
        {filteredUsers.map((user) => (
          <li>
            <UserPreview profile={user} />
          </li>
        ))}
      </ul>
    </>
  );
}
