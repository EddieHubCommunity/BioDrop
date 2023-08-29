import FallbackImage from "@components/FallbackImage";
import Link from "@components/Link";
import Delete from "@components/account/manage/Delete";
import ChevronRightIcon from "@heroicons/react/20/solid/ChevronRightIcon";
import StarIcon from "@heroicons/react/20/solid/StarIcon";
import dateFormat from "@services/utils/dateFormat";

export default function UserRepos({ manage = false, handleDelete, repos }) {
  const item = (repo) => (
    <div className="relative flex justify-between gap-x-6 px-4 py-5 mt-2 hover:bg-primary-low dark:hover:bg-primary-medium transition-all duration-100 sm:px-6 lg:px-8">
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
        </div>
      </div>
      <div className="flex items-center gap-x-4">
        <div className="hidden sm:flex sm:flex-col sm:items-end">
          <p className="inline-flex gap-2 p-3 items-center content-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
            <StarIcon
              className="h-4 w-4 flex-none text-primary-low-medium "
              aria-hidden="true"
            />
            {repo.stats.stars}
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
    <Delete action={handleDelete} id={repo._id} label={repo.name}>
      {item(repo)}
    </Delete>
  );

  return (
    <ul role="list" className="divide-y divide-primary-low">
      {repos.map((repo) => (
        <li key={repo._id}>{manage ? manageDelete(repo) : item(repo)}</li>
      ))}
    </ul>
  );
}
