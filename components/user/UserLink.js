import { useState } from "react";

import getIcon from "../Icon";
import colors from "../../config/icons.json";
import Link from "../Link";

export default function UserLink({
  BASE_URL,
  link,
  username,
  displayStatsPublic,
}) {
  const [clicks, setClicks] = useState(link.clicks || 0);
  const DisplayIcon = getIcon(link.icon);

  return (
    <Link
      href={`${BASE_URL}/api/users/${username}/links/${encodeURIComponent(
        link.url
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-full border-2 border-gray-200 hover:border-[color:var(--hover-color)] hover:shadow-xl p-4 my-2 w-full content-start flex flex-row gap-4 items-center"
      style={{
        "--hover-color": colors[link.icon],
      }}
      onClick={() => setClicks(clicks + 1)}
    >
      <span style={{ color: colors[link.icon] }}>
        <DisplayIcon aria-label={`${link.icon.slice(2)} icon`}/>
      </span>
      <span className="grow">{link.name}</span>
      {displayStatsPublic && <span>{clicks}</span>}
    </Link>
  );
}
