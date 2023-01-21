import getIcon from "../Icon";

function UserSocial({ BASE_URL, username, social }) {
  const DisplayIcon = getIcon(social.icon);

  return (
    <a
      href={`${BASE_URL}/api/users/${username}/links/${encodeURIComponent(
        social.url
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:scale-125 transition ease-in-out delay-100"
    >
      <DisplayIcon aria-label={social.icon.slice(2)} />
    </a>
  );
}

export default UserSocial;
