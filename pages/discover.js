import Head from "next/head";
import UserCard from "../components/user/UserCard";
import Page from "../components/Page";

export async function getServerSideProps(context) {
  let data = [];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/discover`
    );
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
        <title>Discover LinkFree Profiles</title>
        <meta
          name="description"
          content="Discover more people in your LinkFree community"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page>
        <h1 className="text-4xl mb-4 font-bold">Discover LinkFree Profiles</h1>

        <div className="mb-12">
          <h2 className="text-xl font-bold mb-4">Random LinkFree Profiles</h2>
          <ul className="flex flex-wrap gap-3 justify-center">
            {data.random.map((profile) => (
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
