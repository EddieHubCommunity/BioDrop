import AvatarGroup from "./AvatarGroup";
import getUserAvatar from "@services/github/getUserAvatar";

export default function UserAvatarGroup({ users }) {
  return (
    <AvatarGroup
      itemsSize={20}
      borderedItems
      items={users.map((username) => ({
        id: username,
        image: getUserAvatar(username),
        alt: username,
        href: `/${username}`,
      }))}
    />
  );
}
