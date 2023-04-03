import Link from "@components/Link";

export default function NavLink({ path, item, mode, setIsOpen, onClick }) {
  let className =
    "text-gray-300 hover:ring-2 hover:ring-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium";

  if (mode === "mobile") {
    className =
      "text-gray-300 hover:ring-2 hover:ring-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium";
  }

  if (path?.split("/")[1] === item.url.split("/")[1]) {
    if (mode === "mobile") {
      className =
        "bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium";
    } else {
      className =
        "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium";
    }
  }

  return (
    <Link
      href={item.url}
      className={className}
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
