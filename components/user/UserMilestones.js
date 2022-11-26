import UserMilestone from "./UserMilestone";
import Alert from "../Alert";

export default function UserMilestones({ data }) {
  return (
    <>
      {!data.milestones && <Alert type="info" message="No milestones found" />}
      {data.milestones.map((milestone, index) => (
        <div className="flex" key={index}>
          <div className="w-14 border-l-4 flex flex-col">
            <div className="border-dashed border-b-2 grow"></div>
            <div className="grow"></div>
          </div>
          <UserMilestone milestone={milestone} />
        </div>
      ))}
    </>
  );
}
