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

const alerts = {
  createOrUpdate: {
    type: "success",
    message: "Event Created/Updated Successfully",
  },
  delete: {
    type: "success",
    message: "Event Deleted Successfully",
  }
}

export default function ManageEvents({ events }) {
  const router = useRouter();
  const { success, deleted } = router.query;

  return (
    <>
      <PageHead
        title="Manage Events"
        description="Here you can manage your LinkFree events"
      />

      <Page>
        {success && (
          <Alert {...alerts.createOrUpdate} />
        )}
        {deleted && (
          <Alert {...alerts.delete} />
        )}

        <Navigation />
        <Button href="/account/manage/event">
          <DocumentPlusIcon className="h-5 w-5 mr-2" />
          Add Event
        </Button>

        <UserEvents events={events} manage={true} filter="all" />
      </Page>
    </>
  );
}
