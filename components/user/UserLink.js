import { useState } from "react";
import app from "../../config/app.json";
import colors from "../../config/icons.json";
import Icon from "../Icon";

export default function UserLink({ link, username, displayStatsPublic }) {
  const [clicks, setClicks] = useState(link.clicks || 0);

  const clickLink = async () => {
    try {
      const res = await fetch(
        `${app.baseUrl}/api/statistics/${username}/${encodeURIComponent(
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
