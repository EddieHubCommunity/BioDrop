import { useState } from "react";
import { useSession } from "next-auth/react";

import { clientEnv } from "@config/schemas/clientSchema";
import { getStandupApi } from "./api/standup";
import Button from "@components/Button";
import Page from "@components/Page";
import PageHead from "@components/PageHead";
import Textarea from "@components/form/Textarea";
import UserMini from "@components/user/UserMini";
import Notification from "@components/Notification";

export async function getServerSideProps() {
  let standups = await getStandupApi();

  return {
    props: { standups, BASE_URL: clientEnv.NEXT_PUBLIC_BASE_URL },
  };
}

export default function Standup({ BASE_URL, standups }) {
  const { data: session } = useSession();
  const [standupList, setStandupList] = useState(standups);
  const [content, setContent] = useState("");
  const [showNotification, setShowNotification] = useState({
    show: false,
    type: "",
    message: "",
    additionalMessage: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${BASE_URL}/api/standup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });
    const create = await res.json();

    if (create.message || !create) {
      return setShowNotification({
        show: true,
        type: "error",
        message: "Standup failed",
        additionalMessage: "Please try again",
      });
    }

    const standups = await fetch(`${BASE_URL}/api/standup`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setStandupList(await standups.json());
    setContent("");

    return setShowNotification({
      show: true,
      type: "success",
      message: "Standup added",
      additionalMessage: "Your Standup has been added successfully",
    });
  };

  return (
    <>
      <PageHead
        title="Daily Standup from the LinkFree community"
        description="Daily Standups by the LinkFree community"
      />

      <Page>
        <Notification
          show={showNotification.show}
          type={showNotification.type}
          onClose={() =>
            setShowNotification({ ...showNotification, show: false })
          }
          message={showNotification.message}
          additionalMessage={showNotification.additionalMessage}
        />

        {session && (
          <form className="relative" onSubmit={handleSubmit}>
            <Textarea
              name="standup"
              placeholder="You can use markdown..."
              label="1. What did you do yesterday? 2. What are you doing today? 3. What are you blocked by?"
              minlength="2"
              maxlength="1024"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="absolute inset-x-0 bottom-0 flex justify-between p-2 m-2 items-end">
              <div>{content.length}</div>
              <div>
                <Button type="submit" primary={true}>
                  Post
                </Button>
              </div>
            </div>
          </form>
        )}

        <h2 className="text-2xl font-bold tracking-tight text-primary-high dark:text-primary-low sm:text-4xl mt-4">
          No Likes, No Algo, just YOUR content
        </h2>

        <ul>
          {standupList.map((standup) => (
            <li key={standup._id}>
              <UserMini
                BASE_URL={BASE_URL}
                username={standup.username}
                heading={standup.profile.name}
                description={standup.content}
              />
            </li>
          ))}
        </ul>
      </Page>
    </>
  );
}
