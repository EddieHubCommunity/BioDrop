import { authOptions } from "../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { PencilIcon, DocumentPlusIcon } from "@heroicons/react/24/outline";

import logger from "@config/logger";
import PageHead from "@components/PageHead";
import Page from "@components/Page";
import Navigation from "@components/account/manage/navigation";
import { getMilestonesApi } from "pages/api/account/manage/milestones";
import Button from "@components/Button";
import UserMilestones from "@components/user/UserMilestones";

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

export default function Milestones({ milestones }) {
  return (
    <>
      <PageHead
        title="Manage Milestones"
        description="Here you can manage your LinkFree milestones"
      />

      <Page>
        <Navigation />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8">
          <div>
            <Button href="/account/manage/milestone">
              <DocumentPlusIcon className="h-5 w-5 mr-2" />
              Add Milestone
            </Button>

            <ul role="list" className="divide-y divide-gray-100">
              {milestones.map((milestone) => (
                <li
                  key={milestone._id}
                  className="flex items-center justify-between gap-x-6 py-5"
                >
                  <div className="min-w-0">
                    <div className="flex items-start gap-x-3">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {milestone.title}
                      </p>
                      <p
                        className={`rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset ${
                          milestone.isGoal
                            ? "text-yellow-800 bg-yellow-50 ring-yellow-600/20"
                            : "text-green-700 bg-green-50 ring-green-600/20"
                        }`}
                      >
                        {milestone.isGoal ? "Goal" : "Success"}
                      </p>
                    </div>
                    <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                      <p className="whitespace-nowrap">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-none items-center gap-x-4">
                    <Button href={`/account/manage/milestone/${milestone._id}`}>
                      <PencilIcon className="h-5 w-5 mr-2" />
                      Edit
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <UserMilestones milestones={milestones} />
          </div>
        </div>
      </Page>
    </>
  );
}
