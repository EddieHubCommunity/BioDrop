import { getRepos } from "./api/repos";

import Page from "@components/Page";
import PageHead from "@components/PageHead";
import Select from "@components/form/Select";
import UserRepos from "@components/user/UserRepos";
import { PROJECT_NAME } from "@constants/index";
import { useRouter } from "next/router";

export async function getServerSideProps({ query }) {
  const sortBy = query.sortBy || "favourites";
  const repos = await getRepos(sortBy);

  return {
    props: { repos },
  };
}

export default function Repos({ repos }) {
  const router = useRouter();
  const sortOptions = [
    {
      label: "pushed date",
      value: "pushed-date",
    },
    {
      label: "created date",
      value: "created-date",
    },
    {
      label: "stars",
      value: "stars",
    },
    {
      label: "forks",
      value: "forks",
    },
    {
      label: "favourites",
      value: "favourites",
    },
  ];

  return (
    <>
      <PageHead
        title={`Repos from the ${PROJECT_NAME} community members`}
        description={`Repo by the ${PROJECT_NAME} community`}
      />

      <Page>
        <h1 className="text-4xl mb-4 font-bold">Community Repos</h1>
        <div className=" flex justify-end">
          <Select
            name="event-type"
            value={router.query.sortBy || "favourites"}
            label="Sort by"
            onChange={(e) =>
              router.push(`/repos?sortBy=${e.currentTarget.value}`)
            }
            options={sortOptions.map((option) => ({
              label: option.label,
              value: option.value,
            }))}
            className="inline text-center text-sm font-medium leading-6 text-primary-high sm:pt-1.5"
          />
        </div>
        <UserRepos repos={repos} />
      </Page>
    </>
  );
}
