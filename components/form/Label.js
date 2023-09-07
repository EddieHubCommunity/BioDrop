import { classNames } from "@services/utils/classNames";

export default function Label({ htmlFor, className = "", ...restProps }) {
  return (
    <label
        htmlFor={htmlFor}
        className={classNames("dark:text-white hidden md:block mb-2", className)}
        {...restProps}
      >
        {restProps.children}
      </label>
  );
}
