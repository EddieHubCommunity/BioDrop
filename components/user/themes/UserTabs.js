import { useEffect, useState } from "react";

import UserEvents from "../UserEvents";
import UserLinks from "../UserLinks";
import UserMilestones from "../UserMilestones";
import UserTestimonials from "../UserTestimonials";
import Tabs from "../../Tabs";
import UserRepos from "../UserRepos";

export default function UserTabs({ data, BASE_URL }) {
  const defaultTabs = [
    { name: "My Links", href: "#", current: true, url: 'links'},
    { name: "Milestones", href: "#", current: false, url: 'milestones' },
    { name: "Testimonials", href: "#", current: false, url: 'testimonials' },
    { name: "Events", href: "#", current: false, url: 'events' },
    { name: "Repos", href: "#", current: false, url: 'repos' },
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
    e.preventDefault();    setTabs(
      tabs.map((tab) =>{
        if (tab.name === e.target?.value || tab.name === value){
        addTabsToURL(tab.url)
          return { ...tab, current: true }
        } else {
          return { ...tab, current: false }}
        }
      )
    );
  };

  useEffect(() => {
    getTabsURL()
  }, [])

  function addTabsToURL(url) {
    if (typeof window === 'undefined') return 
    window.history.pushState({}, '', `?tabs=${url}`);
  }

  const getTabsURL = () => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const tabs = urlParams.get('tabs');
      if (tabs) {
        console.log(`Button value from URL: ${tabs}`);
      } else {
        addTabsToURL('links')
      }
    }
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
