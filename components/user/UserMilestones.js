import Select from "@components/form/Select";
import UserMilestone from "./UserMilestone";
import Alert from "@components/Alert";
import { useEffect, useState } from "react";

let options = [
  {
    value: "dd/MM/yyyy",
    label: "dd/MM/yyyy",
  },
  {
    value: "January/dd/yyyy",
    label: "January/dd/yyyy",
  },

  {
    value: "Jan/dd/yyyy",
    label: "Jan/dd/yyyy",
  },
];

export default function UserMilestones({ milestones, manage = false }) {
  const historicMilestones = milestones.filter(
    (milestone) => !milestone.isGoal
  );

  const futureMilestones = milestones.filter((milestone) => milestone.isGoal);

  const [dateFormatStyle, setDateFormatStyle] = useState(options[0].value);

  useEffect(() => {
    const savedDateFormat = localStorage.getItem("biodrop-dateFormat");
    if (savedDateFormat) {
      setDateFormatStyle(savedDateFormat);
    }
  }, []);

  return (
    <>
      {!milestones?.length && (
        <Alert type="info" message="No Milestones found" />
      )}
      <div className="flex justify-end mt-2 text-center">
        <Select
          name="layout"
          label="Select format"
          value={dateFormatStyle}
          options={options}
          onChange={(e) => {
            setDateFormatStyle(e.target.value);
            localStorage.setItem("biodrop-dateFormat", e.target.value);
          }}
        />
      </div>
      <ul role="list" className="divide-y divide-primary-low-medium mt-4">
        {milestones &&
          historicMilestones.map((milestone, key) => (
            <UserMilestone
              dateFormatStyle={dateFormatStyle}
              milestone={milestone}
              isGoal={false}
              key={key}
              manage={manage}
            />
          ))}
      </ul>

      {futureMilestones.length > 0 && (
        <div className="flex justify-center items-center gap-3 text-primary-medium-low dark:text-primary-low-medium my-4 text-xl p-4">
          Future Goals
        </div>
      )}

      <ul role="list" className="divide-y divide-primary-low mt-4">
        {futureMilestones.map((goal, key) => (
          <UserMilestone
            milestone={goal}
            isGoal={true}
            key={key}
            dateFormatStyle={dateFormatStyle}
            manage={manage}
          />
        ))}
      </ul>
    </>
  );
}
