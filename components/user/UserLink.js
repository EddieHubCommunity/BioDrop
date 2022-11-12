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
      className="p-3 flex flex-col  hover:bg-white w-[15rem] h-[12rem] rouned text-white rounded-lg gap-3 relative justify-center items-center font-mono "
      style={{
        background: colors[link.icon] ? colors[link.icon] : "rgb(23, 21, 21)",
        color: colors[link.icon] ? colors[link.icon] : "rgb(23, 21, 21)",
      }}
    >
      <div className="w-10 h-10 flex justify-center items-center rounded-full bg-white">
        <Icon name={link.icon} />
      </div>
      <span className="text-white text-center">{link.name}</span>
      {displayStatsPublic && (
        <span className="text-white absolute top-2 right-3 ">{clicks}</span>
      )}
    </a>
  );
}
