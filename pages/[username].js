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
    // TODO: redirect to 404
    console.log("ERROR user not found ", e);
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

      <div className="mx-auto container px-6 mt-6">
        <div className="flex justify-center gap-x-6">
          <FallbackImage
            src={data.avatar}
            alt={`Profile picture of ${data.name}`}
            width={120}
            height={120}
            fallback={data.name}
            className="rounded-full"
          />
          <div className="flex flex-col self-center">
            <h1 className="text-3xl font-bold">{data.name}</h1>
            {data.displayStatsPublic && (
              <h2 className="text-1xl text-gray-600">Views: {data.views}</h2>
            )}
          </div>
        </div>
        <div className="flex justify-center my-4">
          <ReactMarkdown>{data.bio}</ReactMarkdown>
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
