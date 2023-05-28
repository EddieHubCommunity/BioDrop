import { abbreviateNumber } from "@services/utils/abbreviateNumbers";
import Badge from "./Badge";

export default function Tag({ name, total, selected, onClick }) {
  return (
    <Badge
      content={abbreviateNumber(total)}
      display={!!total}
      badgeClassName={"translate-x-1.5 -translate-y-1"}
    >
      <button
        onClick={onClick}
        className={`flex flex-row p-1 m-2 rounded-lg text-sm font-mono border-2 cursor-pointer shadow-none ${
          selected
            ? "hover:border-white bg-tertiary-medium text-white"
            : "hover:border-tertiary-medium"
        }`}
      >
        {name}
      </button>
    </Badge>
  );
}
