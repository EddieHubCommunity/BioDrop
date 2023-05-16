import getIcon from "@components/Icon";
import colors from "@config/icons.json";
import Link from "@components/Link";

export default function UserLink({ BASE_URL, link, username }) {
  const DisplayIcon = getIcon(link.icon);
  let aria = "";

  try {
    aria = link.icon.slice(2);
  } catch (e) {
    aria = "Globe";
  }

  return (
    <Link
      href={`${BASE_URL}/api/users/${username}/links/${encodeURIComponent(
        link.url
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-full border border-primary-medium-low dark:border-primary-medium-low dark:hover:border-[color:var(--hover-color)] hover:border-[color:var(--hover-color)] hover:shadow-xl p-4 my-2 w-full content-start flex flex-row gap-4 items-center dark:bg-primary-medium"
      style={{
        "--hover-color": colors[link.icon],
      }}
    >
      <span style={{ color: colors[link.icon] }}>
        <DisplayIcon aria-label={`${aria} icon`} />
      </span>
      <span className="grow">{link.name}</span>
    </Link>
  );
}
