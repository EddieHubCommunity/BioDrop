// profile photo numbers/stats
// QR code?
// discover tag
// user card

import Link from "./Link";

export default function Badge({ title, content, path, position, children }) {
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
  console.log(position, css);
  const badge = (
    <div
      title={title}
      className={`absolute inline-block translate-x-2/4 -translate-y-1/2 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 py-1 px-1.5 text-xs leading-none text-center whitespace-nowrap align-baseline font-bold bg-orange-600 text-black rounded-full z-10 ${css}`}
    >
      {content}
    </div>
  );

  let clickable;
  if (path) {
    clickable = <Link href={path}>{badge}</Link>;
  }

  return (
    <div className="inline-flex relative w-fit">
      {children}
      {clickable ? clickable : badge}
    </div>
  );
}
