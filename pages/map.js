import dynamic from "next/dynamic";

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
    console.log("ERROR search users", e);
  }

  users = users.filter(
    (user) =>
      user.location &&
      (user.location.provided !== "unknown" &&
        user.location.name !== "unknown" &&
        user.location.provided.toLowerCase() !== "remote")
  );

  return {
    props: { users },
  };
}

export default function Map({ users }) {
  return <DynamicMap users={users} />;
}
