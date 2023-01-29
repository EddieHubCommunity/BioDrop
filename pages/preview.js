import { useState, useEffect } from "react";
import Link from "../components/Link";
import { IconContext } from "react-icons";
import { FaRegComments } from "react-icons/fa";
import requestIp from "request-ip";
import PageHead from "../components/PageHead";
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

export default function Preview() {
  const [userData, setUserData] = useState();
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    handlePreviewData();
  }, []);

  const handlePreviewData = () => {
    let userPreviewData = localStorage.getItem("PREVIEW_PROFILE_DATA");
    let parsedData = JSON.parse(userPreviewData);
    setUserData(parsedData);
    console.log(parsedData);
    handleTabs(parsedData);
  };

  const handleTabs = (data) => {
    let displayTabs = defaultTabs.flatMap((tab) => {
      if (tab.name === "My Links") {
        if (data?.links && data?.links.length) {
          return { ...tab, total: data?.links.length };
        }
        return [];
      }
      if (tab.name === "Milestones") {
        if (data?.milestones && data?.milestones.length) {
          return { ...tab, total: data?.milestones.length };
        }
        return [];
      }
      if (tab.name === "Testimonials") {
        if (data?.testimonials && data?.testimonials.length) {
          return { ...tab, total: data?.testimonials.length };
        }
        return [];
      }
      if (tab.name === "Events") {
        if (data?.events && data?.events.length) {
          return { ...tab, total: data?.events.length };
        }
        return [];
      }
    });

    setTabs(displayTabs);
  };

  const defaultTabs = [
    { name: "My Links", href: "#", current: true, order: "ASC" },
    { name: "Milestones", href: "#", current: false, order: "ASC" },
    { name: "Testimonials", href: "#", current: false, order: "ASC" },
    { name: "Events", href: "#", current: false, order: "ASC" },
  ];

  const [tabs, setTabs] = useState([]);
  console.log(tabs);

  return (
    <>
      {userData && tabs && (
        <>
          <PageHead title="Preview" description="Preview profile json" />

          <Page>
            <h3 className="text-2xl md:text-4xl mb-4 font-bold">Preview</h3>
            <Link href="/playground">Back to playground</Link>
            <UserProfile data={userData} BASE_URL={BASE_URL} />

            <UserTabs tabs={tabs} setTabs={setTabs} userData={userData} setUserData={setUserData} />

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
              tabs.find((tab) => tab.name === "Events").current && <UserEvents data={userData} />}
          </Page>

          <Link
            href={`https://github.com/EddieHubCommunity/LinkFree/issues/new?labels=testimonial&template=testimonial.yml&title=New+Testimonial+for+${userData?.name}&name=${userData?.username}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <div className="fixed bottom-5 right-5 px-4 py-2 bg-indigo-600 text-white flex items-center gap-1 rounded-full hover:bg-indigo-800">
              <IconContext.Provider value={{ color: "white", style: { verticalAlign: "middle" } }}>
                <FaRegComments />
              </IconContext.Provider>
              <p className="text-sm font-medium">Add testimonial for {userData?.name}</p>
            </div>
          </Link>
        </>
      )}
    </>
  );
}

// User.getLayout = function getLayout(page) {
//   if (singleUser.username) {
//     return <SingleLayout>{page}</SingleLayout>;
//   }
//   return <MultiLayout>{page}</MultiLayout>;
// };
