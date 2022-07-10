import Head from "next/head";
import singleUser from "../config/user.json";

export async function getStaticProps(context) {
  if (singleUser.username) {
    return {
      redirect: {
        destination: `/${singleUser.username}`,
        permanent: true,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  return (
    <>
      <Head>
        <title>LinkFree</title>
        <meta
          name="description"
          content="Open Source alternative to LinkTree"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-3xl font-bold underline">Home</h1>
    </>
  );
}
