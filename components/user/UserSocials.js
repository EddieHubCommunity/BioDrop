import getIcon from "../Icon";
import Link from "../Link";

function UserSocial({ BASE_URL, username, social }) {
  const DisplayIcon = getIcon(social.icon);

  return (
    <Link
      href={`${BASE_URL}/api/users/${username}/links/${encodeURIComponent(
        social.url
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:scale-125 transition ease-in-out delay-100"
    >
      <DisplayIcon aria-label={social.icon.slice(2)} />
    </Link>
  );
}

export default UserSocial;
