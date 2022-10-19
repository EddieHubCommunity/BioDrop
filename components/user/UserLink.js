import { useState } from "react";
import app from "../../config/app.json";

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

    window.open(link.url, "_blank");
  };

  return (
    <button
      onClick={() => clickLink()}
      className="rounded-full border-2 border-gray-200 hover:border-gray-500 hover:shadow-xl p-4 my-2 w-full content-start"
    >
      {link.name} {displayStatsPublic && <span>({clicks})</span>}
    </button>
  );
}
