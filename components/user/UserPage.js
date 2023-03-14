import { useState } from "react";

import UserProfile from "./UserProfile";
import UserTabs from "./UserTabs";
import UserLinks from "./UserLinks";
import UserMilestones from "./UserMilestones";
import UserTestimonials from "./UserTestimonials";
import UserEvents from "./UserEvents";

export default function UserPage({ data, BASE_URL }) {
  const [userData, setUserData] = useState(data);
  const defaultTabs = [
    { name: "My Links", href: "#", current: true, order: "ASC" },
    { name: "Milestones", href: "#", current: false, order: "ASC" },
    { name: "Testimonials", href: "#", current: false, order: "ASC" },
    { name: "Events", href: "#", current: false, order: "ASC" },
  ];
  let displayTabs = defaultTabs.flatMap((tab) => {
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

    return { ...tab, total: userData.links.length };
  });
  const [tabs, setTabs] = useState(displayTabs);

  return (
    <>
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
    </>
  );
}
