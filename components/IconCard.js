import getIcon from "../components/Icon";

export default function IconCard({ iconName }) {
  const Icon = getIcon(iconName);
  return (
    <div>
      <Icon />
    </div>
  );
}
