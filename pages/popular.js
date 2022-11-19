import Head from "next/head";
import UserCard from "../components/user/UserCard";

import app from "../config/app.json";

export async function getServerSideProps(context) {
  let data = [];
  try {
    const res = await fetch(`${app.baseUrl}/api/users/popular`);
    data = await res.json();
  } catch (e) {
    console.log("ERROR loading popular profiles", e);
  }

  return {
    props: { data },
  };
}

export default function Popular({ data }) {
  return (
    <>
      <Head>
        <title>Popular LinkFree Profiles</title>
        <meta
          name="description"
          content="Discover more people in your LinkFree community"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="p-5">
        <h1 className="text-4xl mb-4  font-bold">Popular Profiles</h1>
        <ul className="flex flex-wrap gap-3 justify-center mt-[3rem]">
          {data.map((profile) => (
            <li key={profile.username}>
              <UserCard profile={profile} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
