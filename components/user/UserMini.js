import Button from "@components/Button";
import FallbackImage from "@components/FallbackImage";
import Markdown from "@components/Markdown";
import { abbreviateNumber } from "@services/utils/abbreviateNumbers";

export default function UserMini({
  BASE_URL,
  username,
  name,
  bio,
  text,
  monthly,
  total,
  clicks,
  rank,
}) {
  return (
    <div className="overflow-hidden bg-white shadow dark:shadow-none dark:border-primary-low-medium border ">
      <h2 className="sr-only" id="profile-overview-title">
        Profile Overview
      </h2>

      <div className="bg-white dark:bg-primary-high p-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="sm:flex sm:space-x-5">
            <div className="flex-shrink-0">
              <FallbackImage
                src={`https://github.com/${username}.png`}
                width="100"
                height="100"
                className="mx-auto h-20 w-20 rounded-full"
                alt={`Profile picture for GitHub user "${username}"`}
              />
            </div>
            <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
              {text && (
                <p className="text-sm font-medium text-primary-medium dark:text-primary-low-medium">
                  {text}
                </p>
              )}
              <p className="text-xl font-bold text-primary-high dark:text-primary-low sm:text-2xl">
                {name}
              </p>
              <Markdown className="text-sm font-medium text-primary-medium dark:text-primary-low-medium">
                {bio}
              </Markdown>
            </div>
          </div>
          <div className="mt-5 flex justify-center sm:mt-0 min-w-fit">
            <Button href={`${BASE_URL}/${username}`} primary={true}>
              View Profile
            </Button>
          </div>
        </div>
      </div>
      {!!monthly && !!total && !!clicks && !!rank && (
        <div className="grid grid-cols-1 divide-y divide-primary-low-medium/30 dark:divide-primary-low-medium border-t border-primary-low-medium/30 dark:border-primary-low-medium bg-primary-low dark:bg-primary-medium sm:grid-cols-4 sm:divide-x sm:divide-y-0">
          <div className="px-6 py-5 text-center text-sm font-medium">
            <span className="text-primary-medium dark:text-primary-low-medium">
              Rank
            </span>{" "}
            <span className="text-primary-high dark:text-primary-low">
              {rank}
            </span>
          </div>
          <div className="px-6 py-5 text-center text-sm font-medium">
            <span className="text-primary-high dark:text-primary-low">
              {abbreviateNumber(monthly)}
            </span>{" "}
            <span className="text-primary-medium dark:text-primary-low-medium">
              Profile views last 30 days
            </span>
          </div>
          <div className="px-6 py-5 text-center text-sm font-medium">
            <span className="text-primary-high dark:text-primary-low">
              {abbreviateNumber(total)}
            </span>{" "}
            <span className="text-primary-medium dark:text-primary-low-medium">
              Total Profile views
            </span>
          </div>
          <div className="px-6 py-5 text-center text-sm font-medium">
            <span className="text-primary-high dark:text-primary-low">
              {abbreviateNumber(clicks)}
            </span>{" "}
            <span className="text-primary-medium dark:text-primary-low-medium">
              Total link clicks
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
