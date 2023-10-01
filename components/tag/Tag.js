import { abbreviateNumber } from "@services/utils/abbreviateNumbers";
import Badge from "../Badge";
import { classNames } from "@services/utils/classNames";

export default function Tag({ name, total, selected, onClick }) {
  return (
    <Badge
      content={abbreviateNumber(total)}
      display={!!total}
      badgeClassName={"translate-x-1.5 -translate-y-1"}
    >
      <button
        onClick={onClick}
        className={classNames(
          selected
            ? "hover:border-white bg-tertiary-medium text-black"
            : "hover:border-tertiary-medium",
          "flex flex-row p-1 m-2 rounded-lg text-sm font-mono border-2 cursor-pointer shadow-none",
        )}
      >
        {name}
      </button>
    </Badge>
  );
}
