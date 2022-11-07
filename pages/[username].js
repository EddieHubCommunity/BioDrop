import Head from "next/head";
import ReactMarkdown from "react-markdown";

import app from "../config/app.json";
import SingleLayout from "../components/layouts/SingleLayout";
import MultiLayout from "../components/layouts/MultiLayout";
import singleUser from "../config/user.json";
import UserLink from "../components/user/UserLink";
import UserMilestone from "../components/user/UserMilestone";
import FallbackImage from "../components/FallbackImage";
import EventPreview from "../components/events/EventPreview";

export async function getServerSideProps(context) {
  let data = {};
  try {
    const res = await fetch(
      `${app.baseUrl}/api/users/${context.query.username}`
    );
    data = await res.json();
  } catch (e) {
    console.log("ERROR user not found ", e);
  }

  if (!data.username) {
    return {
      redirect: {
        destination: `/search?username=${context.query.username}`,
        permanent: false,
      },
    };
  }

  return {
    props: { data },
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

      <div className="mx-auto container px-6 mt-6 ">
        <div className="flex flex-col gap-3 items-center relative px-5 pb-5 rounded-t-2xl bg-">
          {data.displayStatsPublic && (
            <h2 className="text-md lg:text-xl flex items-center self-end text-[#65615e]">
              Views
              <span className="text-white ml-3 px-5 rounded-2xl bg-[#3da639] font-medium">
                {data.views}
              </span>
            </h2>
          )}
          <FallbackImage
            src={data.avatar}
            alt={`Profile picture of ${data.name}`}
            width={120}
            height={120}
            fallback={data.name}
            className="rounded-full border-2 border-white"
          />
          <div className="flex gap-3">
            <h1 className="text-xl lg:text-2xl text-[#ff5a00] font-bold">
              {data.name}
            </h1>
          </div>
          <ReactMarkdown className="text-md lg:text-lg text-center text-[#65615e]">
            {data.bio}
          </ReactMarkdown>
        </div>
        <div className="flex flex-col items-center w-full">
          {data.links &&
            data.links.map((link, index) => (
              <UserLink
                key={index}
                link={link}
                username={data.username}
                displayStatsPublic={data.displayStatsPublic}
              />
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

        <div className="my-8"></div>
        {data.events &&
          data.events.map((event, index) => (
            <div className="flex" key={index}>
              <div className="w-14 border-l-4 flex flex-col">
                <div className="border-dashed border-b-2 grow"></div>
                <div className="grow"></div>
              </div>
              <EventPreview event={event} username={data.username} />
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
