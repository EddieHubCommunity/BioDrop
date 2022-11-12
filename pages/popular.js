import Head from "next/head";

import UserPreview from "../components/user/UserPreview";
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
        <h1 className="lg:text-3xl md:text-2xl text-xl font-bold mb-4 w-fit p-3 text-[#202328] rounded border-b-4 border-b-green-500">
          Popular Profiles
        </h1>
        <ul className="flex flex-wrap gap-3 justify-center mt-[3rem]">
          {data.map((profile) => (
            <li key={profile.username}>
              <UserPreview profile={profile} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
