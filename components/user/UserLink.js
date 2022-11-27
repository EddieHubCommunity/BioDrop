import { useState } from "react";
import colors from "../../config/icons.json";
import Icon from "../Icon";

export default function UserLink({
  BASE_URL,
  link,
  username,
  displayStatsPublic,
}) {
  console.log("COMPONENT", BASE_URL);
  const [clicks, setClicks] = useState(link.clicks || 0);
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
      className="rounded-full border-2 border-gray-200 hover:border-gray-500 hover:shadow-xl p-4 my-2 w-full content-start flex flex-row gap-4 items-center"
      style={{
        color: colors[link.icon],
      }}
    >
      <Icon name={link.icon} />
      <span className="grow">{link.name}</span>
      {displayStatsPublic && <span>{clicks}</span>}
    </a>
  );
}
