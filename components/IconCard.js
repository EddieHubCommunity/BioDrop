import getIcon from "../components/Icon";

export default function IconCard({ iconName }) {
  const Icon = getIcon(iconName);
  return (
    <div className="border-2 p-2 border-slate-100 w-24 h-24 flex flex-col items-center justify-around rounded">
      <Icon className="h-7 w-7 fill-grey-700" />
      <p className="w-full text-xs break-words text-center text-zinc-500">
        {iconName}
      </p>
    </div>
  );
}
