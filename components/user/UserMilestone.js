import Icon from "../Icon";

export default function UserMilestone({ milestone }) {
  return (
    <div
      className="border-2 border-gray-200 p-4 my-2 rounded-tr-lg grow flex gap-4 items-center"
      key={milestone.title}
      style={{
        "border-color": milestone.color,
      }}
    >
      <Icon name={milestone.icon} />
      <div>
        <h2 className="text-xl">
          {milestone.date} {milestone.title}
        </h2>
        <p>{milestone.description}</p>
      </div>
    </div>
  );
}
