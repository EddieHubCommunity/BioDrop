import { classNames } from "@services/utils/classNames";

export default function Label({ htmlFor, className = "", ...restProps }) {
  return (
    <label
      htmlFor={htmlFor}
      className={classNames("dark:text-white md:block", className)}
      {...restProps}
    >
      {restProps.children}
    </label>
  );
}
