import Icon from "../Icon";

function UserSocial({ BASE_URL, username, social }) {
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
      <Icon name={social.platform} />
    </a>
  );
}

export default UserSocial;
