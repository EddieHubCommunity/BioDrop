import { useState } from "react";
import { authOptions } from "../../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import logger from "@config/logger";
import PageHead from "@components/PageHead";
import Page from "@components/Page";
import Button from "@components/Button";
import Navigation from "@components/account/manage/navigation";
import { getMilestoneApi } from "pages/api/account/manage/milestone/[[...data]]";
import Input from "@components/form/Input";
import UserMilestone from "@components/user/UserMilestone";
import Toggle from "@components/form/Toggle";
import Notification from "@components/Notification";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  const username = session.username;
  const id = context.query.data ? context.query.data[0] : undefined;
  let milestone = {};
  if (id) {
    try {
      milestone = await getMilestoneApi(username, id);
    } catch (e) {
      logger.error(e, `milestone failed for username: ${username}`);
    }
  }

  return {
    props: { milestone, BASE_URL: process.env.NEXT_PUBLIC_BASE_URL },
  };
}

export default function Milestone({ BASE_URL, milestone }) {
  const [showNotification, setShowNotification] = useState(false);
  const [title, setTitle] = useState(milestone.title);
  const [description, setDescription] = useState(milestone.description);
  const [url, setUrl] = useState(milestone.url);
  const [icon, setIcon] = useState(milestone.icon);
  const [date, setDate] = useState(milestone.date);
  const [isGoal, setIsGoal] = useState(milestone.isGoal);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let putMilestone = {
      title,
      description,
      url,
      icon,
      date,
      isGoal,
      order: milestone.order,
    };
    let apiUrl = `${BASE_URL}/api/account/manage/milestone/`;
    if (milestone._id) {
      putMilestone = { ...putMilestone, _id: milestone._id };
      apiUrl = `${BASE_URL}/api/account/manage/milestone/${milestone._id}`;
    }
    const res = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(putMilestone),
    });
    await res.json();
    setShowNotification(true);
  };

  return (
    <>
      <PageHead
        title="Manage Milstone"
        description="Here you can manage your LinkFree milestone"
      />

      <Page>
        <Navigation />

        <Notification
          show={showNotification}
          type="success"
          onClose={() => setShowNotification(false)}
          message="Milestone saved"
          additionalMessage="Your milestone information has been saved successfully."
        />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 xl:gap-x-48">
          <form
            className="space-y-8 divide-y divide-gray-200"
            onSubmit={handleSubmit}
          >
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
              <div className="space-y-6 sm:space-y-5">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    What milestones would you like to appear on your profile?
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Tip: Add future milestones to your profile
                  </p>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <Input
                      name="title"
                      label="Title"
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                    />
                  </div>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <Input
                      name="description"
                      label="Description"
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                    />
                  </div>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <Input
                      name="url"
                      label="Url"
                      onChange={(e) => setUrl(e.target.value)}
                      value={url}
                    />
                  </div>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <Input
                      name="date"
                      label="Date"
                      onChange={(e) => setDate(e.target.value)}
                      value={date}
                    />
                  </div>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <Input
                      name="icon"
                      label="Icon"
                      onChange={(e) => setIcon(e.target.value)}
                      value={icon}
                    />
                  </div>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <Toggle
                      text1="Is Goal?"
                      text2="Future milestone"
                      enabled={isGoal}
                      setEnabled={setIsGoal}
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <Button primary={true}>SAVE</Button>
                </div>
              </div>
            </div>
          </form>
          <div>
            <UserMilestone
              milestone={{ title, description, url, icon, date, isGoal }}
              isGoal={isGoal}
            />
          </div>
        </div>
      </Page>
    </>
  );
}
