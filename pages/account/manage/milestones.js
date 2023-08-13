import { authOptions } from "../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import DocumentPlusIcon from "@heroicons/react/24/outline/DocumentPlusIcon";
import { useRouter } from "next/router";

import logger from "@config/logger";
import PageHead from "@components/PageHead";
import Page from "@components/Page";
import Navigation from "@components/account/manage/Navigation";
import { getMilestonesApi } from "pages/api/account/manage/milestones";
import Button from "@components/Button";
import UserMilestones from "@components/user/UserMilestones";
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

  let milestones = [];
  try {
    milestones = await getMilestonesApi(username);
  } catch (e) {
    logger.error(
      e,
      `profile loading failed milestones for username: ${username}`
    );
  }

  return {
    props: { milestones },
  };
}

export default function ManageMilestones({ milestones }) {
  const router = useRouter();
  const { success } = router.query;

  return (
    <>
      <PageHead
        title="Manage Milestones"
        description="Here you can manage your LinkFree milestones"
      />

      <Page>
        {success && (
          <Alert
            type="success"
            message="Milestone Created/Updated Successfully"
          />
        )}

        <Navigation />

        <Button href="/account/manage/milestone">
          <DocumentPlusIcon className="h-5 w-5 mr-2" />
          Add Milestone
        </Button>

        <UserMilestones milestones={milestones} manage={true} />
      </Page>
    </>
  );
}
