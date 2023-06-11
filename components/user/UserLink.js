import colors from "@config/icons.json";
import getIcon from "@components/Icon";
import Link from "@components/Link";
import Button from "@components/Button";
import { PencilIcon } from "@heroicons/react/24/outline";

export default function UserLink({ BASE_URL, link, username, manage = false }) {
  const DisplayIcon = getIcon(link.icon);
  let aria = "";

  try {
    aria = link.icon.slice(2);
  } catch (e) {
    aria = "Globe";
  }

  return (
    <div className="flex flex-row gap-6 w-full">
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
      {manage && (
        <Button href={`/account/manage/link/${encodeURIComponent(link.url)}`}>
          <PencilIcon className="h-5 w-5 mr-2" />
          Edit
        </Button>
      )}
    </div>
  );
}
