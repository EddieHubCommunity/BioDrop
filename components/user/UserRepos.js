import FallbackImage from "@components/FallbackImage";
import Link from "@components/Link";
import Delete from "@components/account/manage/Delete";
import ChevronRightIcon from "@heroicons/react/20/solid/ChevronRightIcon";
import StarIcon from "@heroicons/react/20/solid/StarIcon";
import PencilIcon from "@heroicons/react/20/solid/PencilIcon";
import ExclamationCircleIcon from "@heroicons/react/20/solid/ExclamationCircleIcon";
import dateFormat from "@services/utils/dateFormat";
import { ReactSortable } from "react-sortablejs";
import { useState, useEffect } from "react";
import { clientEnv } from "@config/schemas/clientSchema";
import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";
import Button from "@components/Button";

export default function UserRepos({ manage = false, confirmDelete, repos }) {

  const [reposList, setReposList] = useState(repos || []);
  const [reorder, setReorder] = useState(false);
  const [reposListPrevious, setReposListPrevious] = useState(repos || []);
  const saveOrder = async () => {
    const BASE_URL = clientEnv.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(`${BASE_URL}/api/account/manage/repos`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reposList),
    });
    const updatedRepos = await res.json();
    setReposList(updatedRepos);
    setReposListPrevious(updatedRepos);
    setReorder(false);
  };
  useEffect(()=>{
    setReposList(repos)
  },[repos]);

  
  const item = (repo) => (
    <div className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-primary-low dark:hover:bg-primary-medium transition-all duration-100 sm:px-6 lg:px-8">
     
      <div className="flex gap-x-4">
        <FallbackImage
          className="h-12 w-12 flex-none rounded-full bg-primary-low"
          src={`https://github.com/${repo.owner}.png`}
          alt={`${repo.owner} avatar`}
          width={100}
          height={100}
        />
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-primary-high dark:text-primary-low">
            <Link href={repo.url} target="_blank">
              <span className="absolute inset-x-0 -top-px bottom-0" />
              {repo.owner}/{repo.name}
            </Link>{" "}
            <span className="hidden md:inline">
              ({dateFormat({ format: "long", date: repo.dates.pushedAt })})
            </span>
          </p>
          <p className="mt-1 flex text-xs leading-5 text-primary-high dark:text-primary-low">
            {repo.description}
          </p>
          {repo.usernames && (
            <p className="mt-1 flex text-xs leading-5 text-primary-high dark:text-primary-low italic">
              Added by {repo.usernames.join(", ")}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-x-4">
        <div className="hidden sm:flex sm:flex-col sm:items-end gap-2">
          <p className="inline-flex gap-2 p-3 items-center content-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
            <StarIcon
              className="h-4 w-4 flex-none text-primary-low-medium "
              aria-hidden="true"
            />
            {repo.stats.stars}
          </p>
          <p className="inline-flex gap-2 p-3 items-center content-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-800 ring-1 ring-inset ring-blue-600/20">
            <PencilIcon
              className="h-4 w-4 flex-none text-primary-low-medium"
              aria-hidden="true"
            />
            {repo.stats.forks}
          </p>
          <p className="inline-flex gap-2 p-3 items-center content-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-red-800 ring-1 ring-inset ring-red-600/20">
            <ExclamationCircleIcon
              className="h-4 w-4 flex-none text-primary-low-medium"
              aria-hidden="true"
            />
            {repo.stats.issues}
          </p>
        </div>
        <ChevronRightIcon
          className="h-5 w-5 flex-none text-primary-low-medium"
          aria-hidden="true"
        />
      </div>
    </div>
  );

  const manageDelete = (repo) => (
    <Delete
      action={() => confirmDelete(repo._id)}
      id={repo._id}
      label={repo.name}
    >
      {item(repo)}
    </Delete>
  );

  return (
    <>
    <div className="flex gap-4">
    {!reorder && manage && (
          <Button
            onClick={() => setReorder(true)}
            disabled={reposList.length < 2}
          >
            <ArrowPathIcon className="h-5 w-5 mr-2" />
            REORDER
          </Button>
        )}
        {reorder && (
          <Button
            onClick={() => {
              setReorder(false);
              setReposList(reposListPrevious);
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
      <ReactSortable
          list={reposList}
          setList={setReposList}
          disabled={!reorder}
          tag="ul"
          ghostClass="border-2"
          chosenClass="border-dashed"
          dragClass="border-red-500"
          className="divide-y divide-primary-low"
        >
      {reposList.map((repo) => (
        <li key={repo._id}>{manage ? manageDelete(repo) : item(repo)}</li>
      ))}
      </ReactSortable>
    </>
  );
}
