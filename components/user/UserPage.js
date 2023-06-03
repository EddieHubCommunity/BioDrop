import { useState } from "react";

import UserProfile from "./UserProfile";
import UserTabs from "./UserTabs";
import UserLinks from "./UserLinks";
import UserMilestones from "./UserMilestones";
import UserTestimonials from "./UserTestimonials";
import UserEvents from "./UserEvents";
import UserEddieHubData from "./EddieHub/UserEddieHubData";

export default function UserPage({ data, BASE_URL, apiEvents }) {
  const defaultTabs = [
    { name: "My Links", href: "#", current: true },
    { name: "Milestones", href: "#", current: false },
    { name: "Testimonials", href: "#", current: false },
    { name: "Events", href: "#", current: false },
    { name: "EddieHub Stats", href: "#", current: false },
  ];
  data.testimonials = data.testimonials.filter(
    (testimonial) => testimonial.isPinned
  );
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

    if (tab.name === "EddieHub Stats") {
      if (Object.keys(apiEvents).length >= 1) {
        return { ...tab };
      }
      return [];
    }

    return { ...tab, total: data.links?.length };
  });
  const [tabs, setTabs] = useState(displayTabs);

  return (
    <>
      <UserProfile data={data} BASE_URL={BASE_URL} />
      <UserTabs tabs={tabs} setTabs={setTabs} />

      {tabs.find((tab) => tab.name === "My Links")?.current && (
        <UserLinks data={data} BASE_URL={BASE_URL} />
      )}
      {tabs.find((tab) => tab.name === "Milestones")?.current && (
        <UserMilestones data={data} />
      )}

      {tabs.find((tab) => tab.name === "Testimonials")?.current && (
        <UserTestimonials testimonials={data.testimonials} />
      )}

      {tabs.find((tab) => tab.name === "Events")?.current && (
        <UserEvents data={data} />
      )}

      {tabs.find((tab) => tab.name === "EddieHub Stats")?.current && (
        <UserEddieHubData data={apiEvents} />
      )}
    </>
  );
}
