import { useEffect, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { classNames } from "@services/utils/classNames";

import getIcon from "@components/Icon";
import Link from "@components/Link";
import Edit from "@components/account/manage/Edit";
import Markdown from "@components/Markdown";

export default function UserMilestone({ milestone, isGoal, manage }) {
  const [date, setDate] = useState(milestone.date);

  useEffect(() => {
    const parse = Date.parse(milestone.date);
    if (!isNaN(parse)) {
      setDate(new Date(parse).toLocaleDateString());
    }
  }, [milestone.date]);

  const DisplayIcon = getIcon(milestone.icon);
  const item = (milestone, isGoal) => {
    const colors = isGoal
      ? "text-primary-medium/70 dark:text-primary-low-medium/[.83]"
      : "text-primary-medium dark:text-primary-low-medium";

    return (
      <div className="flex space-x-3 grow">
        {milestone.icon && (
          <DisplayIcon
            className={`h-8 w-8 rounded-full ${manage ? "ml-12" : "ml-0"}`}
          />
        )}
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <h3
              className={classNames(
                isGoal && "opacity-70",
                "text-sm font-medium"
              )}
            >
              <span>{milestone.title}</span>
            </h3>
            <p className={`text-sm flex gap-2 items-center ${colors}`}>
              {date}
              {milestone.url && (
                <Link
                  href={milestone.url}
                  aria-label="Milestone Related Link"
                  target="_blank"
                >
                  <FaExternalLinkAlt />
                </Link>
              )}
            </p>
          </div>
          <Markdown className={`text-sm ${colors}`}>
            {milestone.description}
          </Markdown>
        </div>
      </div>
    );
  };

  const edit = (milestone, isGoal) => (
    <Edit
      href={`/account/manage/milestone/${milestone._id}`}
      label={`${milestone.title} Milestone`}
    >
      {item(milestone, isGoal)}
    </Edit>
  );
  return (
    <li className="flex flex-row gap-8 py-4 border-primary-low-medium">
      {manage ? edit(milestone, isGoal) : item(milestone, isGoal)}
    </li>
  );
}
