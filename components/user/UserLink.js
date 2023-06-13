import colors from "@config/icons.json";
import getIcon from "@components/Icon";
import Link from "@components/Link";
import Button from "@components/Button";
import { PencilIcon } from "@heroicons/react/24/outline";
import Edit from "@components/account/manage/edit";

export default function UserLink({ BASE_URL, link, username, manage = false }) {
  const DisplayIcon = getIcon(link.icon);
  let aria = "";

  try {
    aria = link.icon.slice(2);
  } catch (e) {
    aria = "Globe";
  }

  const item = (link) => (
    <Link
      href={`${BASE_URL}/api/profiles/${username}/links/${encodeURIComponent(
        link.url
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-full border border-primary-medium-low dark:border-primary-medium-low dark:hover:border-[color:var(--hover-color)] hover:border-[color:var(--hover-color)] hover:shadow-xl p-4 my-2 w-full content-start flex flex-row gap-4 items-center dark:bg-primary-medium grow"
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

  const edit = (link) => (
    <Edit href={`/account/manage/link/${encodeURIComponent(link.url)}`}>
      {item(link)}
    </Edit>
  );

  return (
    <div className="flex flex-row gap-8 w-full">
      {manage ? edit(link) : item(link)}
    </div>
  );
}
