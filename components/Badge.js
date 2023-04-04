import Link from "./Link";

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
      className={`absolute inline-block rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 py-1 px-1.5 text-xs leading-none text-center whitespace-nowrap align-baseline font-bold ${
        disable ? "text-primary-medium bg-primary-low" : "text-black bg-tertiary-medium"
      } rounded-full z-10 ${css} ${badgeClassName}`}
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
    <div className={`inline-flex relative ${className ? className : "w-fit"}`}>
      {children}
      {display && (clickable ? clickable : badge)}
    </div>
  );
}
