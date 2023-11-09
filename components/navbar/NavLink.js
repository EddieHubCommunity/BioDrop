import va from "@vercel/analytics";
import Link from "@components/Link";

export default function NavLink({
  path,
  item,
  mode,
  setIsOpen,
  onClick,
  ...restProps
}) {
  let className =
    "text-primary-low hover:ring-2 hover:ring-tertiary-medium hover:text-tertiary-medium px-3 py-2 rounded-md text-sm font-medium";

  if (mode === "mobile") {
    className =
      "text-primary-low hover:ring-2 hover:ring-tertiary-medium hover:text-tertiary-medium block px-3 py-2 rounded-md text-base font-medium";
  }

  if (path?.split("/")[1] === item.url.split("/")[1]) {
    if (mode === "mobile") {
      className =
        "bg-primary-high text-white block px-3 py-2 rounded-md text-base font-medium";
    } else {
      className =
        "bg-tertiary-medium text-primary-medium px-3 py-2 rounded-md text-sm font-medium";
    }
  }

  return (
    <Link
      href={item.url}
      className={className}
      aria-current="page"
      onClick={(e) => {
        setIsOpen && setIsOpen(false);
        va.track(`navbar`, { link: item.name });
        if (onClick) {
          onClick(e);
        }
      }}
      {...restProps}
    >
      {item.name}
    </Link>
  );
}
