import Head from "next/head";
import Link from "next/link";
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
      <main className="py-6">
      <h1 className="text-3xl font-semibold text-center mb-6">LinkFree connects audiences to all of your content with just one link</h1>
      <p className="text-2xl font-normal text-center mb-6">
          It is an open-source alternative to Linktree implemented in JavaScript
        </p>
        <p className="text-1xl text-center">
          See <Link href="/eddiejaoude"><span className="text-cyan-600 cursor-pointer">Eddie Jaoude&apos;s</span></Link> profile for an
          example. Want to add your profile? Read the{' '}
          <Link href="https://github.com/EddieHubCommunity/LinkFree#-to-add-your-profile">
            <span className="text-cyan-600 cursor-pointer">instructions</span>
          </Link>.
        </p>
      </main>
    </>
  );
}
