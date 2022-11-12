import Head from "next/head";
import ReactMarkdown from "react-markdown";
import { abbreviateNumber } from "js-abbreviation-number";

import app from "../config/app.json";
import SingleLayout from "../components/layouts/SingleLayout";
import MultiLayout from "../components/layouts/MultiLayout";
import singleUser from "../config/user.json";
import UserLink from "../components/user/UserLink";
import UserMilestone from "../components/user/UserMilestone";
import FallbackImage from "../components/FallbackImage";
import EventPreview from "../components/events/EventPreview";
import UserSocial from "../components/user/UserSocials";

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

        <meta property="og:title" content={data.name} />
        <meta property="og:type" content="image/png" />
        <meta
          property="og:url"
          content={`https://linkfree.eddiehub.io/${data.username}`}
        />
        <meta property="og:image" content={data.avatar} />
      </Head>

      <div className="mx-auto container px-6 mt-6">
        <div className="flex justify-center gap-x-6">
          <div className="inline-flex relative w-fit">
            {data.displayStatsPublic && (
              <div className="absolute inline-block top-0 right-0 bottom-auto left-auto translate-x-2/4 -translate-y-1/2 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 py-1 px-1.5 text-xs leading-none text-center whitespace-nowrap align-baseline font-bold bg-orange-600 text-white rounded-full z-10">
                {abbreviateNumber(data.views)}
              </div>
            )}
            <FallbackImage
              src={data.avatar}
              alt={`Profile picture of ${data.name}`}
              width={120}
              height={120}
              fallback={data.name}
              className="rounded-full"
            />
          </div>

          <div className="flex flex-col self-center gap-3">
            <h1 className="text-3xl font-bold">{data.name}</h1>
            <div className="flex gap-2">
              {data.socials &&
                data.socials.map((social, index) => (
                  <UserSocial social={social} key={index} />
                ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center my-4">
          <ReactMarkdown>{data.bio}</ReactMarkdown>
        </div>
        <div className="flex flex-wrap justify-center">
          {data.tags &&
            data.tags.map((tag, index) => (
              <span
                key={index}
                className="flex flex-row p-1 m-2 rounded-lg text-sm font-mono border-2 border-dashed"
              >
                {tag}
              </span>
            ))}
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
