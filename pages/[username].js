import { useState } from "react";
import Link from "../components/Link";
import { IconContext } from "react-icons";
import { FaRegComments } from "react-icons/fa";
import requestIp from "request-ip";
import { getUserApi } from "./api/users/[username]/index";

import PageHead from "../components/PageHead";
import logger from "../config/logger";
import SingleLayout from "../components/layouts/SingleLayout";
import MultiLayout from "../components/layouts/MultiLayout";
import singleUser from "../config/user.json";
import Page from "../components/Page";
import UserPage from "../components/user/UserPage";

export async function getServerSideProps(context) {
  const { req } = context;
  const username = context.query.username;
  let log;
  log = logger.child({ username: username, ip: requestIp.getClientIp(req) });
  let data = {};

  const { status, userData } = await getUserApi(username);
  if(status === 200) {
    data = userData;
    log.info(`data loaded for username: ${username}`);
  } else {
    log.error(userData.error, `profile loading failed for username: ${username}`);
  }

  if (!data.username) {
    return {
      redirect: {
        destination: `/search?username=${username}`,
        permanent: false,
      },
    };
  }

  return {
    props: { data, BASE_URL: process.env.NEXT_PUBLIC_BASE_URL },
  };
}

export default function User({ data, BASE_URL }) {

  return (
    <>
      <PageHead
        title={data.name}
        description={data.bio}
        ogTitle={data.name}
        ogUrl={`https://linkfree.eddiehub.io/${data.username}`}
        ogImage={data.avatar}
        ogType="image/png"
      />

      <Page>
        <userPage data={data} BASE_PATH={BASE_PATH} />
      </Page>

      <Link
        href={`https://github.com/EddieHubCommunity/LinkFree/issues/new?labels=testimonial&template=testimonial.yml&title=New+Testimonial+for+${userData.name}&name=${userData.username}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        <div className="fixed bottom-5 right-5 px-4 py-2 bg-indigo-600 text-white flex items-center gap-1 rounded-full hover:bg-indigo-800">
          <IconContext.Provider
            value={{ color: "white", style: { verticalAlign: "middle" } }}
          >
            <FaRegComments />
          </IconContext.Provider>
          <p className="text-sm font-medium">
            Add testimonial for {userData.name}
          </p>
        </div>
      </Link>
    </>
  );
}

User.getLayout = function getLayout(page) {
  if (singleUser.username) {
    return <SingleLayout>{page}</SingleLayout>;
  }
  return <MultiLayout>{page}</MultiLayout>;
};
