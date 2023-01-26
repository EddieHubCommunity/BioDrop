import { useState } from "react";
import Link from "../components/Link";
import { IconContext } from "react-icons";
import { FaRegComments } from "react-icons/fa";
import requestIp from "request-ip";

import PageHead from "../components/PageHead";
import logger from "../config/logger";
import SingleLayout from "../components/layouts/SingleLayout";
import MultiLayout from "../components/layouts/MultiLayout";
import singleUser from "../config/user.json";
import UserProfile from "../components/user/UserProfile";
import UserTabs from "../components/user/UserTabs";
import UserLinks from "../components/user/UserLinks";
import UserMilestones from "../components/user/UserMilestones";
import UserTestimonials from "../components/user/UserTestimonials";
import UserEvents from "../components/user/UserEvents";
import Page from "../components/Page";

export async function getServerSideProps(context) {
  const { req } = context;
  const username = context.query.username;
  let log;
  log = logger.child({ username: username, ip: requestIp.getClientIp(req) });
  let data = {};

  try {
    const resUser = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${username}`
    );
    data = await resUser.json();
    log.info(`data loaded for username: ${username}`);
  } catch (e) {
    log.error(e, `profile loading failed for username: ${username}`);
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
  const [userData, setUserData] = useState(data);
  const defaultTabs = [
    { name: "My Links", href: "#", current: true, order: "ASC" },
    { name: "Milestones", href: "#", current: false, order: "ASC" },
    { name: "Testimonials", href: "#", current: false, order: "ASC" },
    { name: "Events", href: "#", current: false, order: "ASC" },
  ];
  let displayTabs = defaultTabs.flatMap((tab) => {
    if (tab.name === "My Links") {
      if (userData.links && userData.links.length) {
        return { ...tab, total: userData.links.length };
      }
      return [];
    }
    if (tab.name === "Milestones") {
      if (userData.milestones && userData.milestones.length) {
        return { ...tab, total: userData.milestones.length };
      }
      return [];
    }
    if (tab.name === "Testimonials") {
      if (userData.testimonials && userData.testimonials.length) {
        return { ...tab, total: userData.testimonials.length };
      }
      return [];
    }
    if (tab.name === "Events") {
      if (userData.events && userData.events.length) {
        return { ...tab, total: userData.events.length };
      }
      return [];
    }
  });
  const [tabs, setTabs] = useState(displayTabs);

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
        <UserProfile data={userData} BASE_URL={BASE_URL} />

        <UserTabs
          tabs={tabs}
          setTabs={setTabs}
          userData={userData}
          setUserData={setUserData}
        />

        {tabs.find((tab) => tab.name === "My Links") &&
          tabs.find((tab) => tab.name === "My Links").current && (
            <UserLinks data={userData} BASE_URL={BASE_URL} />
          )}

        {tabs.find((tab) => tab.name === "Milestones") &&
          tabs.find((tab) => tab.name === "Milestones").current && (
            <UserMilestones data={userData} />
          )}

        {tabs.find((tab) => tab.name === "Testimonials") &&
          tabs.find((tab) => tab.name === "Testimonials").current && (
            <UserTestimonials data={userData} />
          )}

        {tabs.find((tab) => tab.name === "Events") &&
          tabs.find((tab) => tab.name === "Events").current && (
            <UserEvents data={userData} />
          )}
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
