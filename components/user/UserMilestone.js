import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { formatDistance } from "date-fns";

import getIcon from "@components/Icon";
import Edit from "@components/account/manage/Edit";
import { classNames } from "utils/functions/classNames";

export default function UserMilestone({ milestone, isLast, manage = false }) {
  const DisplayIcon = getIcon(milestone.icon);

  const item = (milestone) => {
    const colors = milestone.isGoal
      ? "text-primary-medium/70 dark:text-primary-low-medium/[.83]"
      : "text-primary-medium dark:text-primary-low-medium";

    return (
      <div className="relative flex gap-x-4">
        <div
          className={classNames(
            isLast ? "h-6" : "-bottom-6",
            "absolute left-0 top-0 flex w-6 justify-center"
          )}
        >
          <div className="w-px bg-gray-200" />
        </div>
        <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
          {!milestone.isGoal ? (
            <CheckCircleIcon
              className="h-6 w-6 text-indigo-600"
              aria-hidden="true"
            />
          ) : (
            <div className="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
          )}
        </div>
        {milestone.icon && (
          <DisplayIcon className="h-4 w-4 rounded-full shrink-0 mt-1" />
        )}
        <p className="flex-auto py-0.5 text-sm leading-5 text-gray-500">
          <a
            href={milestone.url}
            target="_blank"
            className="font-medium text-gray-900"
          >
            <ReactMarkdown className={`text-sm ${colors}`}>
              {milestone.description}
            </ReactMarkdown>{" "}
          </a>
        </p>
        <time
          dateTime={milestone.date}
          className="flex-none py-0.5 text-xs leading-5 text-gray-500"
        >
          {formatDistance(new Date(milestone.date), new Date())} ago.
        </time>
      </div>
    );
  };

  const edit = (milestone) => (
    <Edit
      href={`/account/manage/milestone/${milestone._id}`}
      label={`${milestone.title} Milestone`}
    >
      {item(milestone)}
    </Edit>
  );

  return <li>{manage ? edit(milestone) : item(milestone)}</li>;
}
