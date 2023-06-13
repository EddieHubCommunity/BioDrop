import { useState } from "react";

import UserProfile from "./UserProfile";
import UserTabs from "./UserTabs";
import UserLinks from "./UserLinks";
import UserMilestones from "./UserMilestones";
import UserTestimonials from "./UserTestimonials";
import UserEvents from "./UserEvents";

export default function UserPage({ data, BASE_URL }) {
  const defaultTabs = [
    { name: "My Links", href: "#", current: true }, 
    { name: "Milestones", href: "#", current: false },
    { name: "Testimonials", href: "#", current: false },
    { name: "Events", href: "#", current: false },
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

    return { ...tab, total: data.links?.length };
  });
  const [tabs, setTabs] = useState(displayTabs);

  return (
    <>
      <UserProfile data={data} BASE_URL={BASE_URL} />
      {/* <UserTabs tabs={tabs} setTabs={setTabs} /> */}

      <div className="flex justify-between space-x-4">
      {tabs.find((tab) => tab.name === "My Links") && (
        <div className="hidden sm:block ">
        <div className="border-secondary-high dark:border-secondary-low text-secondary-high dark:text-secondary-low py-4 px-1 text-center border-b-2 font-medium text-sm">
          My Links ({tabs.find((tab) => tab.name === "My Links").total})
        </div>
        <UserLinks data={data} BASE_URL={BASE_URL} />
        
        </div>
      )}

      {tabs.find((tab) => tab.name === "Milestones") && (
        <div className="hidden sm:block ">
        <div className="border-secondary-high dark:border-secondary-low text-secondary-high dark:text-secondary-low py-4 px-1 text-center border-b-2 font-medium text-sm">
          Milestones ({tabs.find((tab) => tab.name === "Milestones").total})
        </div>
        
        <UserMilestones data={data} />
        </div>
      )}
      </div>

      <div className="flex justify-between">
      {tabs.find((tab) => tab.name === "Testimonials") && (
        <div className="hidden sm:block ">
        <div className="border-secondary-high dark:border-secondary-low text-secondary-high dark:text-secondary-low py-4 px-1 text-center border-b-2 font-medium text-sm">
          Testimonials ({tabs.find((tab) => tab.name === "Testimonials").total})
        </div>
        <UserTestimonials testimonials={data.testimonials} />
        </div>
      )}
      {tabs.find((tab) => tab.name === "Events") && (
        <div className="hidden sm:block ">
        <div className="border-secondary-high dark:border-secondary-low text-secondary-high dark:text-secondary-low py-4 px-1 text-center border-b-2 font-medium text-sm">
          Events ({tabs.find((tab) => tab.name === "Events").total})
        </div>
        <UserEvents data={data} />
        </div>
      )}
      </div>


      {tabs.find((tab) => tab.name === "My Links") && (
        <div className="sm:hidden">
        <div className="border-secondary-high dark:border-secondary-low text-secondary-high dark:text-secondary-low py-4 px-1 text-center border-b-2 font-medium text-sm">
          My Links ({tabs.find((tab) => tab.name === "My Links").total})
        </div>
        <UserLinks data={data} BASE_URL={BASE_URL} />
        
        </div>
      )}

      {tabs.find((tab) => tab.name === "Milestones") && (
        <div className="sm:hidden">
        <div className="border-secondary-high dark:border-secondary-low text-secondary-high dark:text-secondary-low py-4 px-1 text-center border-b-2 font-medium text-sm">
          Milestones ({tabs.find((tab) => tab.name === "Milestones").total})
        </div>
        
        <UserMilestones data={data} />
        </div>
      )}

      {tabs.find((tab) => tab.name === "Events") && (
        <div className="sm:hidden">
        <div className="border-secondary-high dark:border-secondary-low text-secondary-high dark:text-secondary-low py-4 px-1 text-center border-b-2 font-medium text-sm">
          Events ({tabs.find((tab) => tab.name === "Events").total})
        </div>
        <UserEvents data={data} />
        </div>
      )}
      {tabs.find((tab) => tab.name === "Testimonials") && (
        <div className="sm:hidden">
        <div className="border-secondary-high dark:border-secondary-low text-secondary-high dark:text-secondary-low py-4 px-1 text-center border-b-2 font-medium text-sm">
          Testimonials ({tabs.find((tab) => tab.name === "Testimonials").total})
        </div>
        <UserTestimonials testimonials={data.testimonials} />
        </div>
      )}
    </>
  );
}
