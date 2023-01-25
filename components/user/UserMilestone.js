import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { FaExternalLinkAlt } from "react-icons/fa";

import getIcon from "../Icon";
import Link from "../Link";

export default function UserMilestone({ milestone, isGoal }) {
  const DisplayIcon = getIcon(milestone.icon);
  return (
    <li
      className={`py-4 ${isGoal ? "opacity-50" : ""}`}
      style={{
        borderColor: milestone.color,
      }}
    >
      <div className="flex space-x-3">
        {!milestone.image && milestone.icon && (
          <DisplayIcon className="h-8 w-8 rounded-full" />
        )}
        {milestone.image && (
          <img
            className="h-8 w-8 rounded-full"
            src={milestone.image}
            alt={milestone.title}
          />
        )}
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
            <p className="text-sm text-gray-500">{milestone.date}</p>
          </div>
          <ReactMarkdown className="text-sm text-gray-500">
            {milestone.description}
          </ReactMarkdown>
        </div>
      </div>
    </li>
  );
}
