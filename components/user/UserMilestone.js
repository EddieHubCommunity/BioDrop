import { useEffect, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { FaExternalLinkAlt } from "react-icons/fa";

import getIcon from "@components/Icon";
import Link from "@components/Link";
import Edit from "@components/account/manage/edit";

export default function UserMilestone({ milestone, isGoal, manage }) {
  const [date, setDate] = useState(milestone.date);

  useEffect(() => {
    const parse = Date.parse(date);
    if (!isNaN(parse)) {
      setDate(new Date(parse).toLocaleDateString());
    }
  }, [milestone.date]);

  const DisplayIcon = getIcon(milestone.icon);
  const item = (milestone) => (
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
            {date}
          </p>
        </div>
        <ReactMarkdown className="text-sm text-primary-medium dark:text-primary-medium-low">
          {milestone.description}
        </ReactMarkdown>
      </div>
    </div>
  );

  const edit = (milestone) => (
    <Edit href={`/account/manage/milestone/${milestone._id}`}>
      {item(milestone)}
    </Edit>
  );
  return (
    <li
      className={`flex flex-row gap-8 py-4 ${
        isGoal ? "opacity-50" : ""
      } border-primary-low-medium`}
    >
      {manage ? edit(milestone) : item(milestone)}
    </li>
  );
}
