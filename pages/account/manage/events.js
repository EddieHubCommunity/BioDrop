import { authOptions } from "../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import DocumentPlusIcon from "@heroicons/react/24/outline/DocumentPlusIcon";

import logger from "@config/logger";
import PageHead from "@components/PageHead";
import Page from "@components/Page";
import Navigation from "@components/account/manage/Navigation";
import { getEventsApi } from "pages/api/account/manage/events";
import Button from "@components/Button";
import UserEvents from "@components/user/UserEvents";
import { useRouter } from "next/router";
import Alert from "@components/Alert";
import { PROJECT_NAME } from "@constants/index";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const username = session.username;

  let events = [];
  try {
    events = await getEventsApi(username);
  } catch (e) {
    logger.error(e, `profile loading failed events for username: ${username}`);
  }

  return {
    props: { events },
  };
}

export default function ManageEvents({ events }) {
  const router = useRouter();
  const { alert } = router.query;

  const alerts = {
    deleted: {
      type: "success",
      message: "Event Deleted Successfully",
    },
    created: {
      type: "success",
      message: "Event Created Successfully",
    },
    updated: {
      type: "success",
      message: "Event Updated Successfully",
    },
  };

  return (
    <>
      <PageHead
        title="Manage Events"
        description={`Here you can manage your ${PROJECT_NAME} events`}
      />

      <Page>
        {alert && (
          <Alert type={alerts[alert].type} message={alerts[alert].message} />
        )}
        <Navigation />
        <Button href="/account/manage/event">
          <DocumentPlusIcon className="h-5 w-5 mr-2" />
          Add Event
        </Button>
        <UserEvents events={events} manage={true} />
      </Page>
    </>
  );
}
