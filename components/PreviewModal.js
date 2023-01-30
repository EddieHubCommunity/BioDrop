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

export default function Preview({ isOpen, toggle }) {
  const [userData, setUserData] = useState();
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    if (isOpen) {
      handlePreviewData();
    }
  }, [isOpen]);

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
      {isOpen && (
        <div
          id="defaultModal"
          tabindex="-1"
          aria-hidden="true"
          class="fixed top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full bg-gray-200/50"
        >
          <div class="relative w-full h-full max-w-5xl md:h-auto mx-auto shadow-2xl">
            {/* <!-- Modal content --> */}
            <div class="relative bg-white text-gray-900 rounded-lg">
              {/* <!-- Modal header --> */}
              <div class="flex items-start justify-between p-4  rounded-t border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 ">Preview</h3>
                <button
                  type="button"
                  class="text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white"
                  data-modal-hide="defaultModal"
                  onClick={toggle}
                >
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
              {/* <!-- Modal body --> */}
              <div class="p-6 space-y-6">
                {userData && tabs && (
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

                    <Link
                      href={`https://github.com/EddieHubCommunity/LinkFree/issues/new?labels=testimonial&template=testimonial.yml&title=New+Testimonial+for+${userData?.name}&name=${userData?.username}`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <div className="fixed bottom-5 right-5 px-4 py-2 bg-indigo-600 text-white flex items-center gap-1 rounded-full hover:bg-indigo-800">
                        <IconContext.Provider
                          value={{ color: "white", style: { verticalAlign: "middle" } }}
                        >
                          <FaRegComments />
                        </IconContext.Provider>
                        <p className="text-sm font-medium">Add testimonial for {userData?.name}</p>
                      </div>
                    </Link>
                  </>
                )}
              </div>
              <div class="flex items-center p-6 space-x-2  rounded-b">
                <button
                  data-modal-hide="defaultModal"
                  type="button"
                  class="text-white focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                  onClick={toggle}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
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
