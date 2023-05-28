import Link from "@components/Link";

export default function NavLink({ path, item, mode, setIsOpen, onClick }) {
  const prefetch = mode === "mobile" ? {prefetch: false} : {};

  let className =
    "text-primary-low hover:ring-2 hover:ring-primary-medium dark:hover:ring-secondary-low hover:text-secondary-low px-3 py-2 rounded-md text-sm font-medium";

  if (mode === "mobile") {
    className =
      "text-primary-low hover:ring-2 hover:ring-primary-medium hover:text-secondary-low block px-3 py-2 rounded-md text-base font-medium";
  }

  if (path?.split("/")[1] === item.url.split("/")[1]) {
    if (mode === "mobile") {
      className =
        "bg-primary-high text-white block px-3 py-2 rounded-md text-base font-medium";
    } else {
      className =
        "bg-primary-medium dark:bg-primary-high text-white px-3 py-2 rounded-md text-sm font-medium";
    }
  }

  return (
    <Link
      href={item.url}
      className={className}
      {...prefetch}
      aria-current="page"
      onClick={(e) => {
        setIsOpen && setIsOpen(false);
        if (onClick) {
          onClick(e);
        }
      }}
    >
      {item.name}
    </Link>
  );
}
