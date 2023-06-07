import UserMilestone from "./UserMilestone";
import Alert from "@components/Alert";

export default function UserMilestones({ data }) {
  data.milestones.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });

  const historicMilestones = data.milestones.filter(
    (milestone) => !milestone.isGoal
  );

  const futureMilestones = data.milestones.filter(
    (milestone) => milestone.isGoal
  );
  return (
    <>
      {!data.milestones && <Alert type="info" message="No milestones found" />}
      <ul role="list" className="divide-y divide-primary-low-medium mt-4">
        {data.milestones &&
          historicMilestones.map((milestone, key) => (
            <UserMilestone milestone={milestone} isGoal={false} key={key} />
          ))}
      </ul>

      {futureMilestones.length > 0 && (
        <div className="flex justify-center items-center gap-3 text-primary-medium-low my-4 text-xl p-4">
          Future Goals
        </div>
      )}

      <ul role="list" className="divide-y divide-primary-low mt-4">
        {futureMilestones.map((goal, key) => (
          <UserMilestone milestone={goal} isGoal={true} key={key} />
        ))}
      </ul>
    </>
  );
}
