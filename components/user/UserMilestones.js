import UserMilestone from "./UserMilestone";

export default function UserMilestones({ milestones, manage = false }) {
  return (
    <ul role="list" className="mt-6 space-y-6">
      {milestones.map((milestone, index) => (
        <UserMilestone
          key={milestone._id}
          milestone={milestone}
          manage={manage}
          isLast={index === milestones?.length - 1}
        />
      ))}
    </ul>
  );
}
