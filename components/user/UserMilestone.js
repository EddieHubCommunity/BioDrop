import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import getIcon from "../Icon";
import Link from "../Link";

export default function UserMilestone({ milestone, isGoal }) {
  const DisplayIcon = getIcon(milestone.icon);
  return (
    <li
      className={`py-4 border-l-2 mb-4 pl-2 hover:border-l-4 pr-2 shadow-md ${
        isGoal ? "opacity-50" : ""
      }`}
      style={{
        borderColor: milestone.color,
      }}
    >
      <Link
        href={milestone.url}
        key={milestone.url}
        target="_blank"
        rel="noreferrer"
      >
        <div className="flex space-x-3">
          <DisplayIcon />
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">{milestone.title}</h3>
              <p className="text-sm text-gray-500">{milestone.date}</p>
            </div>
            <ReactMarkdown className="text-sm text-gray-500">
              {milestone.description}
            </ReactMarkdown>
          </div>
        </div>
      </Link>
    </li>
  );
}
