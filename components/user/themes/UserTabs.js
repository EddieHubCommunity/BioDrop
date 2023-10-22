import UserEvents from "../UserEvents";
import UserLinks from "../UserLinks";
import UserMilestones from "../UserMilestones";
import UserTestimonials from "../UserTestimonials";
import Tabs from "../../Tabs";
import UserRepos from "../UserRepos";
import { useRouter } from "next/router";

export default function UserTabs({ data, BASE_URL }) {
  const tabs = [
    {
      name: "My Links",
      href: "links",
      component: (
        <UserLinks
          BASE_URL={BASE_URL}
          links={data.links}
          username={data.username}
        />
      ),
    },
    {
      name: "Milestones",
      href: "milestones",
      component: <UserMilestones milestones={data.milestones} />,
    },
    {
      name: "Testimonials",
      href: "testimonials",
      component: (
        <UserTestimonials
          BASE_URL={BASE_URL}
          testimonials={data.testimonials}
        />
      ),
    },
    {
      name: "Events",
      href: "events",
      component: <UserEvents events={data.events} />,
    },
    {
      name: "Repos",
      href: "repos",
      component: <UserRepos repos={data.repos} />,
    },
  ];

  const router = useRouter();
  const currentTab = router.query.tab || "links";

  const selectedTab = tabs.find((tab) => tab.href === currentTab) || tabs[0];

  const changeTab = (tab) => {
    router.push(`/${data.username}?tab=${tab.href}`, undefined, {
      scroll: false,
      shallow: true,
    });
  };

  return (
    <>
      <Tabs
        selectedTab={selectedTab}
        tabs={tabs
          .filter((tab) => data[tab.href] && data[tab.href].length > 0)
          .map((tab) => ({
            name: tab.name,
            href: tab.href,
            current: tab.href === currentTab,
            total: data[tab.href]?.length || 0,
          }))}
        setTabs={changeTab}
      />
      {selectedTab.component}
    </>
  );
}
