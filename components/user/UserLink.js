import colors from "@config/icons.json";
import getIcon from "@components/Icon";
import Link from "@components/Link";
import Edit from "@components/account/manage/Edit";
import styles from '../../styles/animation.module.css';

const getLinkAnimation = new Map([
  ["Pulse", "group animate-pulse"],
  ["Bounce", "animate-bounce opacity-75"],
  ["Glow", styles.glow],
  ["Wiggle", styles.wiggle],
]);

const getIconAnimation = new Map([
  ["Ping", "animate-ping absolute opacity-75"],
  ["Glow Icon", styles.glow],
]);

export default function UserLink({
  BASE_URL,
  link,
  username,
  isEnabled = true,
  manage = false,
}) {
  const DisplayIcon = getIcon(link.icon);
  let aria = "";

  try {
    aria = link.icon.slice(2);
  } catch (e) {
    aria = "Globe";
  }

  const item = (link) => (
    <Link
      href={`${BASE_URL}/api/profiles/${username}/links/${link._id}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative rounded-full border border-primary-medium-low dark:border-primary-medium-low dark:hover:border-[color:var(--hover-color)] hover:border-[color:var(--hover-color)] hover:shadow-xl p-4 my-2 w-full content-start flex flex-row gap-4 items-center dark:bg-primary-medium ${ link.animation === "Glow Icon" ? "z-0" : "" } ${ link.animation !== "Glow" ? "dark:hover:bg-secondary-low/40 hover:bg-secondary-low/40" : ""} grow ${
        isEnabled ? "" : "opacity-50"
      } ${getLinkAnimation.get(link.animation)}`}
      style={{
        "--hover-color": colors[link.icon],
      }}
    >
      <span className="relative">
        <span style={{ color: colors[link.icon] }} className={getIconAnimation.get(link.animation)}>
          <DisplayIcon aria-label={`${aria} icon`} />
        </span>
        {link.animation === "Ping" && 
          <span style={{ color: colors[link.icon] }} className={`relative`}>
            <DisplayIcon aria-label={`${aria} icon`} />
          </span>
        }
      </span>
      <span className="grow">{link.name}</span>
      {manage && link.isPinned && (
        <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium bg-secondary-low text-secondary-high-high ring-1 ring-inset ring-secondary-high/10">
          Pinned
        </span>
      )}
      {manage && (
        <span
          className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ring-primary-high/10 ${
            link.isEnabled
              ? "bg-tertiary-low text-tertiary-high"
              : "bg-primary-low text-primary-high"
          }`}
        >
          {link.isEnabled ? "Enabled" : "Disabled"}
        </span>
      )}
      {manage && link.group && (
        <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium bg-tertiary-high text-tertiary-low ring-1 ring-inset ring-tertiary-low/10">
          {link.group}
        </span>
      )}
    </Link>
  );

  const edit = (link) => (
    <Edit href={`/account/manage/link/${link._id}`} label={`${link.name} Link`}>
      {item(link)}
    </Edit>
  );

  return (
    <div className="flex flex-row gap-8 w-full">
      {manage ? edit(link) : item(link)}
    </div>
  );
}
