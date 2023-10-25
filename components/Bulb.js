import { classNames } from "@services/utils/classNames";

export default function Bulb({ isEnabled }) {
  return (
    <div
      className={classNames(
        isEnabled
          ? "text-green-600 bg-green-600/10 dark:text-green-400 dark:bg-green-400/10"
          : "text-red-600 bg-red-600/10  dark:text-red-400 dark:bg-red-400/10",
        "flex-none rounded-full p-1",
      )}
    >
      <div className="h-1.5 w-1.5 rounded-full bg-current" />
    </div>
  );
}
