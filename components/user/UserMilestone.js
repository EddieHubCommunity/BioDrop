import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { FaExternalLinkAlt } from "react-icons/fa";

import getIcon from "@components/Icon";
import Link from "@components/Link";

export default function UserMilestone({ milestone, isGoal }) {
  const DisplayIcon = getIcon(milestone.icon);
  return (
    <li
      className={`py-4 ${isGoal ? "opacity-50" : ""} border-gray-300`}
    >
      <div className="flex space-x-3">
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
            <p className="text-sm text-primary-medium dark:text-primary-medium-low">{milestone.date}</p>
          </div>
          <ReactMarkdown className="text-sm text-primary-medium dark:text-primary-medium-low">
            {milestone.description}
          </ReactMarkdown>
        </div>
      </div>
    </li>
  );
}
