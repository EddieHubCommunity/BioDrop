import { getRepos } from "./api/repos";

import Page from "@components/Page";
import PageHead from "@components/PageHead";
import UserRepos from "@components/user/UserRepos";
import { PROJECT_NAME } from "@constants/index";

export async function getServerSideProps() {
  let repos = await getRepos();

  return {
    props: { repos },
  };
}

export default function Repos({ repos }) {
  return (
    <>
      <PageHead
        title={`Repos from the ${PROJECT_NAME} community members`}
        description={`Repo by the ${PROJECT_NAME} community`}
      />

      <Page>
        <h1 className="text-4xl mb-4 font-bold">Community Repos</h1>

        <UserRepos repos={repos} />
      </Page>
    </>
  );
}
