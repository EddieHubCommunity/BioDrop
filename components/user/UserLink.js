import app from "../../config/app.json";
import {useRouter} from 'next/router'

export default function UserLink({ link, username, displayStatsPublic }) {
  const router = useRouter()
  const clickLink = async () => {
    const data = {};
    try {
      const res = await fetch(
        `${app.baseUrl}/api/statistics/${username}/${encodeURIComponent(
          link.url
        )}`,
        { method: "PUT" }
      );
      data = await res.json();
    } catch (e) {
      // TODO: link not found
      console.log("ERROR link not found ", e);
    }
    router.push(link.url)
  };

  return (
    <button
      onClick={() => clickLink()}
      className="rounded-full border-2 border-gray-200 hover:border-gray-500 hover:shadow-xl p-4 my-2 w-full content-start"
    >
      {link.name}{" "}
      {displayStatsPublic && link.clicks && <span>({link.clicks})</span>}
    </button>
  );
}
