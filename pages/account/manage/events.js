import { authOptions } from "../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import DocumentPlusIcon from "@heroicons/react/24/outline/DocumentPlusIcon";

import logger from "@config/logger";
import PageHead from "@components/PageHead";
import Page from "@components/Page";
import Navigation from "@components/account/manage/navigation";
import { getEventsApi } from "pages/api/account/manage/events";
import Button from "@components/Button";
import UserEvents from "@components/user/UserEvents";

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

export default function ManageEvents({ events }) {
  return (
    <>
      <PageHead
        title="Manage Events"
        description="Here you can manage your LinkFree events"
      />

      <Page>
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
