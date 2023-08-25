import colors from "@config/icons.json";
import getIcon from "@components/Icon";
import Link from "@components/Link";
import Edit from "@components/account/manage/Edit";
import styles from "../../styles/animation.module.css";
import config from "@config/app.json";
import { classNames } from "@services/utils/classNames";
import { BsFillPinAngleFill } from "react-icons/bs";

const animations = config.animations;

const getLinkAnimation = new Map([
  [animations.pulse, "group animate-pulse"],
  [animations.bounce, "animate-bounce opacity-75"],
  [animations.glow, `bg-white ${styles.glow}`],
  [animations.wiggle, styles.wiggle],
]);

const getIconAnimation = new Map([
  [animations.ping, "animate-ping absolute opacity-75"],
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

  const item = (link) => {
    return (
      <div className="flex flex-col">
        {manage && link.isPinned && (
          <BsFillPinAngleFill
            className={`text-secondary-high dark:text-primary-low absolute right-2 z-20 h-5 w-5 self-end`}
          />
        )}
        <Link
          href={`${BASE_URL}/api/profiles/${username}/links/${link._id}`}
          target="_blank"
          rel="noopener noreferrer"
          className={classNames(
            animations[link.animation] === animations.iconGlow && "z-0",
            animations[link.animation] !== animations.glow &&
              "dark:hover:bg-secondary-low/40 hover:bg-secondary-low/40",
            !isEnabled && "opacity-50",
            isEnabled && getLinkAnimation.get(animations[link.animation]),
            "border-primary-medium-low dark:border-primary-medium-low dark:bg-primary-medium relative my-2 flex w-full grow flex-row content-start items-center gap-4 rounded-full border p-4 hover:border-[color:var(--hover-color)] hover:shadow-xl dark:hover:border-[color:var(--hover-color)]",
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

          {manage && (
            <span
              className={classNames(
                link.isEnabled
                  ? "bg-tertiary-low text-tertiary-high"
                  : "bg-primary-low text-primary-high",
                "ring-primary-high/10 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset",
              )}
            >
              {link.isEnabled ? "Enabled" : "Disabled"}
            </span>
          )}
          {manage && link.group && (
            <span className="bg-tertiary-high text-tertiary-low ring-tertiary-low/10 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset">
              {link.group}
            </span>
          )}
        </Link>
      </div>
    );
  };

  const edit = (link) => (
    <Edit href={`/account/manage/link/${link._id}`} label={`${link.name} Link`}>
      {item(link)}
    </Edit>
  );

  return (
    <div className="flex w-full flex-row gap-8">
      {manage ? edit(link) : item(link)}
    </div>
  );
}
