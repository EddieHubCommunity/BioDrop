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
      className="p-3 flex flex-col bg-[#d4d1c5]/50 hover:bg-white w-[15rem] h-[10rem] rouned text-white rounded-lg gap-3 relative justify-center items-center font-mono border-2 border-[#65615e] border-dashed"
      style={{
        color: colors[link.icon] ? colors[link.icon] : "rgb(23, 21, 21)",
      }}
    >
      <Icon name={link.icon} />
      <span className=" text-center">{link.name}</span>
      {displayStatsPublic && (
        <span className="absolute top-2 right-3 ">{clicks}</span>
      )}
    </a>
  );
}
