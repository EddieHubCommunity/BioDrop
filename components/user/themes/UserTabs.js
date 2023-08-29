import { useState } from "react";

import UserEvents from "../UserEvents";
import UserLinks from "../UserLinks";
import UserMilestones from "../UserMilestones";
import UserTestimonials from "../UserTestimonials";
import Tabs from "../../Tabs";
import UserRepos from "../UserRepos";

export default function UserTabs({ data, BASE_URL }) {
  const defaultTabs = [
    { name: "My Links", href: "#", current: true },
    { name: "Milestones", href: "#", current: false },
    { name: "Testimonials", href: "#", current: false },
    { name: "Events", href: "#", current: false },
    { name: "Repos", href: "#", current: false },
  ];

  let displayTabs = defaultTabs.flatMap((tab) => {
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
    if (tab.name === "Repos") {
      if (data.repos && data.repos.length) {
        return { ...tab, total: data.repos.length };
      }
      return [];
    }

    return { ...tab, total: data.links?.length };
  });
  const [tabs, setTabs] = useState(displayTabs);
  const changeTab = (e, value) => {
    e.preventDefault();
    setTabs(
      tabs.map((tab) =>
        tab.name === e.target?.value || tab.name === value
          ? { ...tab, current: true }
          : { ...tab, current: false }
      )
    );
  };

  return (
    <>
      <Tabs tabs={tabs} setTabs={changeTab} />

      {tabs.find((tab) => tab.name === "My Links")?.current && (
        <UserLinks
          links={data.links}
          username={data.username}
          BASE_URL={BASE_URL}
        />
      )}

      {tabs.find((tab) => tab.name === "Milestones")?.current && (
        <UserMilestones milestones={data.milestones} />
      )}

      {tabs.find((tab) => tab.name === "Testimonials")?.current && (
        <UserTestimonials
          testimonials={data.testimonials}
          BASE_URL={BASE_URL}
        />
      )}

      {tabs.find((tab) => tab.name === "Events")?.current && (
        <UserEvents events={data.events} />
      )}

      {tabs.find((tab) => tab.name === "Repos")?.current && (
        <UserRepos repos={data.repos} />
      )}
    </>
  );
}
