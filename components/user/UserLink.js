import colors from "@config/icons.json";
import getIcon from "@components/Icon";
import Link from "@components/Link";
import Edit from "@components/account/manage/Edit";
import styles from "../../styles/animation.module.css";
import config from "@config/app.json";
import { classNames } from "@services/utils/classNames";
import Bulb from "@components/Bulb";
const animations = config.animations;

const getLinkAnimation = new Map([
  [animations.pulse, "group motion-safe:animate-pulse"],
  [animations.bounce, "motion-safe:animate-bounce opacity-75"],
  [animations.glow, `bg-white ${styles.glow}`],
  [animations.wiggle, styles.wiggle],
]);

const getIconAnimation = new Map([
  [animations.ping, "motion-safe:animate-ping absolute opacity-75"],
  [animations.iconGlow, styles.glow],
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
      className={classNames(
        animations[link.animation] === animations.iconGlow && "z-0",
        animations[link.animation] !== animations.glow &&
          "dark:hover:bg-secondary-low/40 hover:bg-secondary-low/40",
        isEnabled && getLinkAnimation.get(animations[link.animation]),
        "relative rounded-full border border-primary-medium-low dark:border-primary-medium-low dark:hover:border-[color:var(--hover-color)] hover:border-[color:var(--hover-color)] hover:shadow-xl p-4 my-2 w-full content-start flex flex-row gap-4 items-center dark:bg-primary-medium grow",
      )}
      style={{
        "--hover-color": colors[link.icon],
      }}
    >
      <span className="relative">
        <span
          style={{ color: colors[link.icon] }}
          className={getIconAnimation.get(animations[link.animation])}
        >
          <DisplayIcon aria-label={`${aria} icon`} />
        </span>
        {animations[link.animation] === animations.ping && (
          <span style={{ color: colors[link.icon] }} className={`relative`}>
            <DisplayIcon aria-label={`${aria} icon`} />
          </span>
        )}
      </span>
      <span className="grow">{link.name}</span>
      {manage && link.isPinned && (
        <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium bg-secondary-low text-secondary-high-high ring-1 ring-inset ring-secondary-high/10">
          Pinned
        </span>
      )}
      {manage && (
        <span
          className={classNames(
            link.isEnabled
              ? "bg-tertiary-low text-tertiary-high"
              : "bg-primary-low text-primary-high",
            "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ring-primary-high/10",
          )}
        >
          {link.isEnabled ? "Enabled" : "Disabled"}
        </span>
      )}
      {manage && link.group && (
        <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium bg-tertiary-high text-tertiary-low ring-1 ring-inset ring-tertiary-low/10">
          {link.group}
        </span>
      )}
      {manage && <Bulb isEnabled={isEnabled} />}
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
