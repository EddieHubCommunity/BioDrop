import { useState } from "react";
import Head from "next/head";

import SingleLayout from "../components/layouts/SingleLayout";
import MultiLayout from "../components/layouts/MultiLayout";
import singleUser from "../config/user.json";
import UserProfile from "../components/user/UserProfile";
import UserTabs from "../components/user/UserTabs";
import UserLinks from "../components/user/UserLinks";
import UserMilestones from "../components/user/UserMilestones";
import UserTestimonials from "../components/user/UserTestimonials";
import UserEvents from "../components/user/UserEvents";

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
  const defaultTabs = [
    { name: "My Links", href: "#", current: true },
    { name: "Milestones", href: "#", current: false },
    { name: "Testimonials", href: "#", current: false },
    { name: "Events", href: "#", current: false },
  ];
  let displayTabs = defaultTabs.flatMap((tab) => {
    if (tab.name === "My Links") {
      if (data.links && data.links.length) {
        return { ...tab, total: data.links.length };
      }
      return [];
    }
    if (tab.name === "Milestones") {
      if (data.milestones && data.milestones.length) {
        return { ...tab, total: data.milestones.length };
      }
      return [];
    }
    if (tab.name === "Testimonials") {
      if (data.testimonials && data.testimonials.length) {
        return { ...tab, total: data.testimonials.length };
      }
      return [];
    }
    if (tab.name === "Events") {
      if (data.events && data.events.length) {
        return { ...tab, total: data.events.length };
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

      <div className="mx-auto container px-6 mt-6">
        <UserProfile data={data} BASE_URL={BASE_URL} />

        <UserTabs tabs={tabs} setTabs={setTabs} />

        {tabs.find((tab) => tab.name === "My Links") &&
          tabs.find((tab) => tab.name === "My Links").current && (
            <UserLinks data={data} BASE_URL={BASE_URL} />
          )}

        <div className="my-8"></div>
        {tabs.find((tab) => tab.name === "Milestones") &&
          tabs.find((tab) => tab.name === "Milestones").current && (
            <UserMilestones data={data} />
          )}

        <div className="my-8"></div>
        {tabs.find((tab) => tab.name === "Testimonials") &&
          tabs.find((tab) => tab.name === "Testimonials").current && (
            <UserTestimonials data={data} users={users} BASE_URL={BASE_URL} />
          )}

        <div className="my-8"></div>
        {tabs.find((tab) => tab.name === "Events") &&
          tabs.find((tab) => tab.name === "Events").current && (
            <UserEvents data={data} />
          )}
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
