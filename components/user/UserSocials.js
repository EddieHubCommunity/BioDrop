import getIcon from "../Icon";

function UserSocial({ social }) {
  const Icon = getIcon(social.platform);
  return (
    <a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:scale-125 transition ease-in-out delay-100"
    >
      <Icon />
    </a>
  );
}

export default UserSocial;
