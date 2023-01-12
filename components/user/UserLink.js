import { useState } from "react";

import getIcon from "../Icon";
import colors from "../../config/icons.json";

export default function UserLink({
  BASE_URL,
  link,
  username,
  displayStatsPublic,
}) {
  const [clicks, setClicks] = useState(link.clicks || 0);
  const DisplayIcon = getIcon(link.icon);
  const clickLink = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/statistics/${username}/${encodeURIComponent(
          link.url
        )}`,
        { method: "PUT" }
      );
      const data = await res.json();
      setClicks(data.clicks);
    } catch (e) {
      // TODO: link not found
      console.log("ERROR link not found ", e);
    }
  };

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={clickLink}
      className="rounded-full border-2 border-gray-200 hover:border-[color:var(--hover-color)] hover:shadow-xl p-4 my-2 w-full content-start flex flex-row gap-4 items-center"
      style={{
        "--hover-color": colors[link.icon],
      }}
    >
      <span style={{ color: colors[link.icon] }}>
        <DisplayIcon />
      </span>
      <span className="grow">{link.name}</span>
      {displayStatsPublic && <span>{clicks}</span>}
    </a>
  );
}
