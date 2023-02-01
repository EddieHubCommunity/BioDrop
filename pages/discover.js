import PageHead from "../components/PageHead";
import UserCard from "../components/user/UserCard";
import Page from "../components/Page";
import { useState } from "react";
import { TbRefresh } from "react-icons/tb";
import Tag from "../components/Tag";

export async function getServerSideProps(context) {
  let data = {
    popular: [],
    tags: [],
    trending: [],
    random: []
  };

  const popularPromise = fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/discover/popular`
  );
  const randomPromise = fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/discover/random`
  );
  const tagsPromise = fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/discover/tags`
  );
  const trendingPromise = fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/discover/trending`
  );

  await Promise.all([popularPromise, randomPromise, tagsPromise, trendingPromise])
    .then(async ([popular, random, tags, trending]) => {
      data.popular = await popular.json();
      data.random = await random.json();
      data.tags = await tags.json();
      data.trending = await trending.json();
    })
    .catch(() => console.log(" some error occured"))

  return {
    props: { data, BASE_URL: process.env.NEXT_PUBLIC_BASE_URL },
  };
}

export default function Popular({ data, BASE_URL }) {
  const [randomProfiles, setRandomProfiles] = useState(data.random);

  console.log(data)

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
      <PageHead
        title="Discover LinkFree Profiles"
        description="Discover more people in your LinkFree community"
      />

      <Page>
        <h1 className="text-2xl md:text-4xl mb-4 font-bold">
          Discover LinkFree Profiles
        </h1>

        <div className="flex flex-wrap justify-center mb-4">
          {data.tags &&
            data.tags
              .slice(0, 10)
              .map((tag) => (
                <Tag name={tag.name} key={tag.name} total={tag.total} />
              ))}
        </div>

        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-3 items-center mb-4">
            <h2 className="text-md md:text-xl font-bold">
              Random LinkFree Profiles
            </h2>
            <button
              className="inline-flex gap-3 items-center justify-center rounded-full border border-transparent bg-white px-2 py-1 text-base font-medium text-indigo-600 border-indigo-600 hover:bg-indigo-50"
              onClick={() => fetchRandom()}
              aria-label="refresh random profiles"
            >
              <TbRefresh />
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
