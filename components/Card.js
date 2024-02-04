import { classNames } from "@services/utils/classNames";
import Link from "./Link";

export default function Card({ href, className, active = false, children }) {
  return (
    <Link
      href={href}
      className={classNames(
        "flex flex-col items-center border-2 h-[14rem] overflow-hidden rounded-lg shadow-lg transition duration-350 p-4 gap-3  duration-500 ease-in-out hover:border-tertiary-medium",
        className,
        active && "border-tertiary-medium",
      )}
    >
      {children}
    </Link>
  );
}
