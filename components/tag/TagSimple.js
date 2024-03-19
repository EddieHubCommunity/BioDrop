import { classNames } from "@services/utils/classNames";

export default function TagSimple({ name, isSelected }) {
  return (
    <div
      className={classNames(
        "text-sm px-1 mx-px mb-2 font-mono border rounded-md line-clamp-1",
        isSelected && "border-tertiary-medium",
      )}
    >
      {name}
    </div>
  );
}
