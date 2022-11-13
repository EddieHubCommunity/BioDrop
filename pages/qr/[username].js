import Head from "next/head";
import ReactMarkdown from "react-markdown";
import { QRCodeSVG } from "qrcode.react";
import { abbreviateNumber } from "js-abbreviation-number";

import app from "../../config/app.json";
import FallbackImage from "../../components/FallbackImage";
import UserSocial from "../../components/user/UserSocials";
import Link from "next/link";

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

export default function UserQR({ data }) {
  const fallbackImageSize = 120;
  const imageSize = 250;

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
          content={`https://linkfree.eddiehub.io/qr/${data.username}`}
        />
        <meta property="og:image" content={data.avatar} />
      </Head>

      <div className="mx-auto container px-6 mt-6">
        <div className="flex justify-center gap-x-6">
          <div className="inline-flex relative w-fit">
            {data.displayStatsPublic && (
              <div
                id="profile-views"
                className="absolute inline-block top-0 right-0 bottom-auto left-auto translate-x-2/4 -translate-y-1/2 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 py-1 px-1.5 text-xs leading-none text-center whitespace-nowrap align-baseline font-bold bg-orange-600 text-white rounded-full z-10">
                {abbreviateNumber(data.views)}
              </div>
            )}
            <FallbackImage
              src={data.avatar}
              alt={`Profile picture of ${data.name}`}
              width={fallbackImageSize}
              height={fallbackImageSize}
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
            <Link href={`/${data.username}`}>
              <span className="text-cyan-600 cursor-pointer">Profile</span>
            </Link>
          </div>
        </div>
        <div className="flex justify-center my-4">
          <ReactMarkdown>{data.bio}</ReactMarkdown>
        </div>
        <div className="my-8"></div>
        <div className="flex justify-center mt-20">
          <QRCodeSVG
            value={`https://linkfree.eddiehub.io/${data.username}`}
            size={imageSize}
          />
        </div>
      </div>
    </>
  );
}
