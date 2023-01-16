import UserMilestone from "./UserMilestone";
import Alert from "../Alert";

export default function UserMilestones({ data }) {
  return (
    <>
      {!data.milestones && <Alert type="info" message="No milestones found" />}
      <ul role="list" className="divide-y divide-gray-200">
        {data.milestones &&
          data.milestones.map((milestone, key) => (
            <UserMilestone milestone={milestone} key={key} />
          ))}
      </ul>
    </>
  );
}
