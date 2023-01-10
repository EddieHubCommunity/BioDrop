import Head from "next/head";
import UserCard from "../components/user/UserCard";
import Page from "../components/Page";
import { useState } from "react";
import { TbRefresh } from "react-icons/tb";

export async function getServerSideProps(context) {
  let data = {
    popular: [],
    random: [],
    trending: [],
  };
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/discover/popular`
    );
    data.popular = await res.json();
  } catch (e) {
    console.log("ERROR loading popular profiles", e);
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/discover/random`
    );
    data.random = await res.json();
  } catch (e) {
    console.log("ERROR loading random profiles", e);
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/discover/trending`
    );
    data.trending = await res.json();
  } catch (e) {
    console.log("ERROR loading trending profiles", e);
  }

  return {
    props: { data, BASE_URL: process.env.NEXT_PUBLIC_BASE_URL },
  };
}

export default function Popular({ data, BASE_URL }) {
  const [randomProfiles, setRandomProfiles] = useState(data.random);

  const fetchRandom = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/discover/random`);
      setRandomProfiles(await res.json());
    } catch (e) {
      console.log("ERROR refreshing profiles", e);
    }
  };

  return (
    <>
      <Head>
        <title>Discover LinkFree Profiles</title>
        <meta
          name="description"
          content="Discover more people in your LinkFree community"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page>
        <h1 className="text-2xl md:text-4xl mb-4 font-bold">
          Discover LinkFree Profiles
        </h1>

        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between mb-4">
            <h2 className="text-md md:text-xl font-bold">
              Random LinkFree Profiles
            </h2>
            <button
              className="inline-flex gap-3 items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-indigo-600 border-indigo-600 hover:bg-indigo-50"
              onClick={() => fetchRandom()}
            >
              <TbRefresh />
              Refresh
            </button>
          </div>
          <ul className="flex flex-wrap gap-3 justify-center">
            {randomProfiles.map((profile) => (
              <li key={profile.username}>
                <UserCard profile={profile} />
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-bold mb-4">
            Trending LinkFree Profiles (last 24 hours)
          </h2>
          <ul className="flex flex-wrap gap-3 justify-center">
            {data.trending.map((profile) => (
              <li key={profile.username}>
                <UserCard profile={profile} />
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-bold mb-4">Popular LinkFree Profiles</h2>
          <ul className="flex flex-wrap gap-3 justify-center">
            {data.popular.map((profile) => (
              <li key={profile.username}>
                <UserCard profile={profile} />
              </li>
            ))}
          </ul>
        </div>
      </Page>
    </>
  );
}
