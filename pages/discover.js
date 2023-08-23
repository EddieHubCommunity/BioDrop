import { clientEnv } from "@config/schemas/clientSchema";

import logger from "@config/logger";
import Page from "@components/Page";
import PageHead from "@components/PageHead";
import { getProfiles } from "./api/discover/profiles";

import UserHorizontal from "@components/user/UserHorizontal";

export async function getServerSideProps() {
  let profiles = [];
  try {
    profiles = await getProfiles();
  } catch (e) {
    logger.error(e, "get users failed");
  }
  return {
    props: {
      profiles,
      BASE_URL: clientEnv.NEXT_PUBLIC_BASE_URL,
    },
  };
}

export default function Discover({ profiles }) {
  return (
    <>
      <PageHead
        title="Discover recently updated Profiles on BioDrop"
        description="Discover recently updated Profiles on BioDrop"
      />
      <Page>
        <h1 className="text-4xl mb-4 font-bold">Recently updated Profiles</h1>

        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {profiles.map((profile) => (
            <li key={profile.username}>
              <UserHorizontal profile={profile} />
            </li>
          ))}
        </ul>
      </Page>
    </>
  );
}
