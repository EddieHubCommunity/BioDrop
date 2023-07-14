import Link from "./Link";

export default function Button({
  primary = false,
  disable,
  children,
  ...restProps
}) {
  let className =
    "w-full inline-flex items-center flex-1 justify-center rounded-md border border-transparent px-5 py-3 text-base font-medium first-letter:bg-white transition duration-400 ease-in-out";
  !disable
    ? (className += primary
        ? " text-white bg-secondary-medium hover:bg-secondary-high"
        : " text-secondary-high dark:text-secondary-high-high hover:text-white dark:hover:text-white dark:bg-secondary-low hover:bg-secondary-medium dark:hover:bg-secondary-medium")
    : (className += disable
        ? " border-2 border-red border shadow-sm bg-primary-low text-primary-medium cursor-not-allowed "
        : " cursor-pointer");

  const link = (
    <Link className={className} prefetch={false} {...restProps}>
      {children}
    </Link>
  );

  const button = (
    <button className={className} disabled={disable} {...restProps}>
      {children}
    </button>
  );

  return restProps.href ? link : button;
}
