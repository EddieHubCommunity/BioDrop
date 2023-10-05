import Link from "./Link";
import { classNames } from "@services/utils/classNames";

export default function Badge({
  title,
  content,
  path,
  position,
  className,
  badgeClassName,
  disable,
  children,
  display = true,
  onClick,
}) {
  let css = "";
  const cssTopRight = "top-0 right-0 bottom-auto left-auto";
  const cssTopLeft = "top-0 left-0 bottom-auto right-auto";
  const cssBottomRight = "bottom-0 right-0 top-auto left-auto";
  const cssBottomLeft = "bottom-0 left-0 top-auto right-auto";
  switch (position) {
    case "top-right":
      css = cssTopRight;
      break;
    case "top-left":
      css = cssTopLeft;
      break;
    case "bottom-right":
      css = cssBottomRight;
      break;
    case "bottom-left":
      css = cssBottomLeft;
      break;
    default:
      css = cssTopRight;
  }

  const badge = (
    <div
      title={title}
      className={classNames(
        disable
          ? "text-primary-medium bg-primary-low"
          : "text-black bg-tertiary-medium",
        `absolute inline-block rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 p-2 text-xs leading-none text-center whitespace-nowrap align-baseline font-bold rounded-full z-10 ${css} ${badgeClassName}`,
      )}
      onClick={() => (onClick ? onClick() : null)}
    >
      {content}
    </div>
  );

  let clickable;
  if (path) {
    clickable = <Link href={path}>{badge}</Link>;
  }

  return (
    <div
      className={classNames(
        className ? className : "w-fit",
        "inline-flex relative",
      )}
    >
      {children}
      {display && (clickable ? clickable : badge)}
    </div>
  );
}
