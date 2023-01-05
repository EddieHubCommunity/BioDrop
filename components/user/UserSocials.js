import getIcon from "../Icon";

function UserSocial({ BASE_URL, username, social }) {
  const DisplayIcon = getIcon(social.icon);
  const clickLink = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/statistics/${username}/${encodeURIComponent(
          social.url
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
      href={social.url}
      onClick={clickLink}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:scale-125 transition ease-in-out delay-100"
    >
      <DisplayIcon aria-label={social.icon.slice(2)}/>
    </a>
  );
}

export default UserSocial;
