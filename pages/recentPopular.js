import Head from "next/head";
import UserCard from "../components/user/UserCard";
import Page from "../components/Page";

export async function getServerSideProps(context) {
  let data = [];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/recentPopular`
    );
    data = await res.json();
  } catch (e) {
    console.log("ERROR loading popular profiles of last 28 days", e);
  }

  return {
    props: { data },
  };
}

export default function RecentPopular({ data }) {
  return (
    <>
      <Head>
        <title>Popular LinkFree Profiles in last 28 days</title>
        <meta
          name="description"
          content="Discover more people in your LinkFree community"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page>
        <h1 className="text-4xl mb-4 font-bold">
          Popular Profiles in last 28 days
        </h1>
        <ul className="flex flex-wrap gap-3 justify-center mt-[3rem]">
          {data.map((profile) => (
            <li key={profile.username}>
              <UserCard profile={profile} />
            </li>
          ))}
        </ul>
      </Page>
    </>
  );
}
