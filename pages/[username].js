import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { IconContext } from "react-icons";
import { FaRegComments } from "react-icons/fa";

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
  let data = {};
  let users = [];

  try {
    const resUser = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${context.query.username}`
    );
    data = await resUser.json();
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

  try {
    const resUsers = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`
    );
    users = (await resUsers.json()).map((user) => user.username);
  } catch (e) {
    console.log("ERROR user list", e);
  }

  return {
    props: { users, data, BASE_URL: process.env.NEXT_PUBLIC_BASE_URL },
  };
}

export default function User({ users, data, BASE_URL }) {
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
            <UserTestimonials
              data={userData}
              users={users}
              BASE_URL={BASE_URL}
            />
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
        <div className="fixed bottom-5 right-5 p-2 bg-indigo-600 text-white flex items-center gap-1 rounded-full hover:bg-indigo-800">
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
