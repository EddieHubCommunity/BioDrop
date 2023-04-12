import Link from "./Link";

export default function Button({
  text,
  primary = false,
  disable,
  ...restProps
}) {
  let className =
    "inline-flex items-center justify-center rounded-md border border-transparent px-5 py-3 text-base font-medium first-letter:bg-white";
  !disable
    ? (className += primary
        ? " text-white bg-secondary-medium hover:bg-secondary-high"
        : " text-secondary-high dark:text-secondary-high hover:text-white dark:hover:text-white dark:bg-secondary-low hover:bg-secondary-medium dark:hover:bg-secondary-medium")
    : (className += disable
        ? " border-2 border-red border shadow-sm bg-primary-low text-primary-medium cursor-not-allowed "
        : " cursor-pointer");

  const link = (
    <Link className={className} {...restProps}>
      {text}
    </Link>
  );

  const button = (
    <button className={className} disabled={disable} {...restProps}>
      {text}
    </button>
  );

  return restProps.href ? link : button;
}
