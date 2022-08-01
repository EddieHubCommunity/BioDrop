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
    console.log("ERROR search users", e);
  }

  return {
    props: { users },
  };
}

export default function Search({ users }) {
  const [filteredUsers, setFilteredUsers] = useState(users);
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
      <div className="flex flex-col px-6 align-center">
      <h1 className="text-3xl mb-4  font-bold underline">Search</h1>
      <input
        placeholder="Search users"
        className="border-2 hover:border-sky-500 transition-all duration-250 ease-linear rounded px-6 py-2"
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
