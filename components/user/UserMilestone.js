import getIcon from "../Icon";

export default function UserMilestone({ milestone }) {
  const DisplayIcon = getIcon(milestone.icon);

  return (
    <a
      href={milestone.url}
      className="border-2 border-gray-200 p-4 my-2 rounded-tr-lg grow flex gap-4 items-center"
      key={milestone.title}
      style={{
        borderColor: milestone.color,
      }}
    >
      <DisplayIcon />
      <div>
        <h2 className="text-xl">
          {milestone.date} {milestone.title}
        </h2>
        <p>{milestone.description}</p>
      </div>
    </a>
  );
}
