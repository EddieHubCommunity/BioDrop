import Icon from "../Icon";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export default function UserGoal({ goal }) {
  return (
    <a
      href={goal.url ? goal.url : "/"}
      key={goal.url ? goal.url : goal.title}
      className={!goal.url ? "pointer-events-none" : ""}
      target="_blank"
      rel="noreferrer"
    >
      <li
        className="py-4 border-l-2 mb-4 pl-2 hover:border-l-4 pr-2 shadow-md opacity-50"
        style={{
          borderColor: goal.color,
        }}
      >
        <div className="flex space-x-3">
          <Icon name={goal.icon} />
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">{goal.title}</h3>
              <p className="text-sm text-gray-500">
                {goal.date ? goal.date : ""}
              </p>
            </div>
            <p className="text-sm text-gray-500">
              <ReactMarkdown>{goal.description}</ReactMarkdown>
            </p>
          </div>
        </div>
      </li>
    </a>
  );
}
