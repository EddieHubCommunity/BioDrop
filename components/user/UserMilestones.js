import UserMilestone from "./UserMilestone";
import Alert from "../Alert";
import UserGoal from "./UserGoal";

export default function UserMilestones({ data }) {
  return (
    <>
      {!data.milestones && <Alert type="info" message="No milestones found" />}
      <ul role="list" className="divide-y divide-gray-200">
        {data.milestones &&
          data.milestones
            .filter((milestone) => !milestone.isGoal)
            .map((milestone, key) => (
              <UserMilestone milestone={milestone} key={key} />
            ))}
      </ul>

      <div className="flex justify-center items-center gap-3 text-gray-500 my-4  text-xl p-4">
        <div className="border-t-8 border-dotted border-orange-600 w-[3rem]"></div>
        Future Goals
        <div className="border-t-8 border-dotted border-orange-600 w-[3rem]"></div>
      </div>

      <ul role="list" className="divide-y divide-gray-200">
        {data.milestones
          .filter((milestone) => milestone.isGoal)
          .map((goal, key) => (
            <UserGoal goal={goal} key={key} />
          ))}
      </ul>
    </>
  );
}
