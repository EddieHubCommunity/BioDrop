import Head from "next/head";
import Image from "next/image";

import SingleLayout from "../components/layouts/SingleLayout";
import MultiLayout from "../components/layouts/MultiLayout";
import singleUser from "../config/user.json";
import app from "../config/app.json";
import UserLink from "../components/user/UserLink";
import UserMilestone from "../components/user/UserMilestone";

export async function getServerSideProps(context) {
  let dataGet = {};
  try {
    const resGet = await fetch(
      `${app.baseUrl}/api/users/${context.query.username}`
    );
    dataGet = await resGet.json();
  } catch (e) {
    // TODO: redirect to 404
    console.log("ERROR user not found ", e);
  }

  return {
    props: { data: dataGet },
  };
}

export default function User({ data }) {
  return (
    <>
      <Head>
        <title>{data.name}</title>
        <meta name="description" content={data.bio} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mx-auto container px-6">
        <div className="flex justify-center gap-x-6">
          <Image
            src={data.avatar}
            alt={`Profile picture of ${data.name}`}
            width={120}
            height={120}
            className="rounded-full"
          />
          <div className="flex flex-col self-center">
            <h1 className="text-3xl font-bold">{data.name}</h1>
            <h2 className="text-1xl text-gray-600">Views: {data.views}</h2>
          </div>
        </div>
        <p className="flex justify-center my-4">{data.bio}</p>
        <div className="flex flex-col items-center w-full">
        {data.links &&
          data.links.map((link, index) => (
            <UserLink key={index} link={link} username={data.username} />
          ))}
        </div>
        <div className="my-8"></div>
        {data.milestones &&
          data.milestones.map((milestone, index) => (
            <div className="flex" key={index}>
              <div className="w-14 border-l-4 flex flex-col">
                <div className="border-dashed border-b-2 grow"></div>
                <div className="grow"></div>
              </div>
              <UserMilestone milestone={milestone} />
            </div>
          ))}
      </div>
    </>
  );
}

User.getLayout = function getLayout(page) {
  if (singleUser.username) {
    return <SingleLayout>{page}</SingleLayout>;
  }
  return <MultiLayout>{page}</MultiLayout>;
};
