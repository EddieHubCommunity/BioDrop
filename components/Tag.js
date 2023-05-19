import { abbreviateNumber } from "@services/utils/abbreviateNumbers";
import Badge from "./Badge";

export default function Tag({
  name,
  total,
  selected,
  clickable,
  ...restProps
}) {
  let selectedCss = "";
  if (restProps.onClick || clickable) {
    selectedCss = selected
      ? "cursor-pointer hover:border-white bg-tertiary-medium text-white"
      : "cursor-pointer hover:border-tertiary-medium";
  }
  return (
    <Badge
      content={abbreviateNumber(total)}
      display={!!total}
      badgeClassName={"translate-x-1.5 -translate-y-1"}
    >
      <div
        className={`flex flex-row p-1 m-2 rounded-lg text-sm font-mono border-2 shadow-none ${selectedCss}`}
        {...restProps}
      >
        {name}
      </div>
    </Badge>
  );
}
