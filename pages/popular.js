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

      <div className="mx-auto container">
        <h1 className="text-4xl font-bold mb-4">Popular Profiles</h1>
        <ul>
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
