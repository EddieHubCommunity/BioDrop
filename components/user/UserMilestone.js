import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { FaExternalLinkAlt } from "react-icons/fa";
import { PencilIcon } from "@heroicons/react/24/outline";

import getIcon from "@components/Icon";
import Link from "@components/Link";
import Button from "@components/Button";

export default function UserMilestone({ milestone, isGoal, manage }) {
  const DisplayIcon = getIcon(milestone.icon);
  return (
    <li
      className={`flex flex-row gap-8 py-4 ${
        isGoal ? "opacity-50" : ""
      } border-gray-300`}
    >
      {manage && (
        <div>
          <Button href={`/account/manage/milestone/${milestone._id}`}>
            <PencilIcon className="h-5 w-5 mr-2" />
            Edit
          </Button>
        </div>
      )}
      <div className="flex space-x-3 grow">
        {milestone.icon && <DisplayIcon className="h-8 w-8 rounded-full" />}
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium flex gap-2 items-center">
              <span>{milestone.title}</span>
              {milestone.url && (
                <Link href={milestone.url} target="_blank">
                  <FaExternalLinkAlt />
                </Link>
              )}
            </h3>
            <p className="text-sm text-primary-medium dark:text-primary-medium-low">
              {milestone.date}
            </p>
          </div>
          <ReactMarkdown className="text-sm text-primary-medium dark:text-primary-medium-low">
            {milestone.description}
          </ReactMarkdown>
        </div>
      </div>
    </li>
  );
}
