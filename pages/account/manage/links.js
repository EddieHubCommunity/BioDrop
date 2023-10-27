import { authOptions } from "../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { useState } from "react";
import DocumentPlusIcon from "@heroicons/react/24/outline/DocumentPlusIcon";
import { useRouter } from "next/router";
import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";

import { clientEnv } from "@config/schemas/clientSchema";
import logger from "@config/logger";
import PageHead from "@components/PageHead";
import Page from "@components/Page";
import Navigation from "@components/account/manage/Navigation";
import { getLinksApi } from "pages/api/account/manage/links";
import Button from "@components/Button";
import UserLink from "@components/user/UserLink";
import { ReactSortable } from "react-sortablejs";
import Notification from "@components/Notification";
import Alert from "@components/Alert";
import { PROJECT_NAME } from "@constants/index";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const username = session.username;

  let links = [];
  try {
    links = await getLinksApi(username);
  } catch (e) {
    logger.error(e, `profile loading failed links for username: ${username}`);
  }

  return {
    props: { username, links, BASE_URL: clientEnv.NEXT_PUBLIC_BASE_URL },
  };
}

export default function ManageLinks({ BASE_URL, username, links }) {
  const router = useRouter();
  const [reorder, setReorder] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [linkList, setLinkList] = useState(links || []);
  const [linkListPrevious, setLinkListPrevious] = useState(links || []);

  const { alert } = router.query;

  const alerts = {
    deleted: {
      type: "success",
      message: "Link Deleted Successfully",
    },
    created: {
      type: "success",
      message: "Link Created Successfully",
    },
    updated: {
      type: "success",
      message: "Link Updated Successfully",
    },
  };

  const saveOrder = async () => {
    const res = await fetch(`${BASE_URL}/api/account/manage/links`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(linkList),
    });
    const updatedLinks = await res.json();
    setLinkList(updatedLinks);
    setLinkListPrevious(updatedLinks);
    setShowNotification(true);
    setReorder(false);
  };

  return (
    <>
      <PageHead
        title="Manage Links"
        description={`Here you can manage your ${PROJECT_NAME} links`}
      />

      <Page>
        {alert && (
          <Alert type={alerts[alert].type} message={alerts[alert].message} />
        )}

        <Navigation />

        <Notification
          show={showNotification}
          type="success"
          onClose={() => setShowNotification(false)}
          message="Links updated"
          additionalMessage="Your profile information has been saved successfully."
        />

        <div className="flex gap-4">
          <Button href="/account/manage/link">
            <DocumentPlusIcon className="h-5 w-5 mr-2" />
            Add Link
          </Button>

          {!reorder && (
            <Button
              onClick={() => setReorder(true)}
              disable={linkList.length < 2}
            >
              <ArrowPathIcon className="h-5 w-5 mr-2" />
              REORDER
            </Button>
          )}
          {reorder && (
            <Button
              onClick={() => {
                setReorder(false);
                setLinkList(linkListPrevious);
              }}
            >
              CANCEL
            </Button>
          )}
          {reorder && (
            <Button primary={true} onClick={() => saveOrder()}>
              SAVE
            </Button>
          )}
        </div>

        {!linkList.length && <Alert type="info" message="No Links found" />}

        <ReactSortable
          list={linkList}
          setList={setLinkList}
          disabled={!reorder}
          ghostClass="border-2"
          chosenClass="border-dashed"
          dragClass="border-red-500"
        >
          {linkList.length &&
            linkList.map((link) => (
              <UserLink
                BASE_URL={BASE_URL}
                key={link._id}
                link={link}
                username={username}
                manage={true}
                isEnabled={link.isEnabled}
              />
            ))}
        </ReactSortable>
      </Page>
    </>
  );
}
