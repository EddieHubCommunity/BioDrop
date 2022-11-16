import Icon from "../Icon";

function UserSocial({ social }) {
  return (
    <a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:scale-125 transition ease-in-out delay-100"
    >
      <Icon name={social.platform} />
    </a>
  );
}

export default UserSocial;
