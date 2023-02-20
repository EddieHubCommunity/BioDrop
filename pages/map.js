import dynamic from "next/dynamic";
import logger from "../config/logger";

//this is required as leaflet is not compatible with SSR
const DynamicMap = dynamic(() => import("../components/map/Map"), {
  ssr: false,
});

export async function getServerSideProps() {
  let users = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`);
    users = await res.json();
  } catch (e) {
    logger.error(e, "ERROR search users");
  }

  users = users.filter(
    (user) =>
      user.location &&
      user.location.provided &&
      user.location.provided !== "unknown" &&
      user.location.name !== "unknown" &&
      user.location.provided.toLowerCase() !== "remote"
  );

  return {
    props: { users },
  };
}

export default function Map({ users }) {
  return <DynamicMap users={users} />;
}
