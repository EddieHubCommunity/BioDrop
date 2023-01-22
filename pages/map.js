import dynamic from "next/dynamic";

//this is required as leaflet is not compatible with SSR
const DynamicMap = dynamic(() => import("../components/map/map"), {
  ssr: false,
});

//hardcoded my name for testing - replace with API
export async function getServerSideProps(context) {
  let users = [];
  try {
    const resUser = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/amandamartin-dev/`
    );
    users = await resUser.json();
    // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`);
    // users = await res.json();
  } catch (e) {
    console.log("ERROR search users", e);
  }

  return {
    props: { users },
  };
}

export default function Map({users}) {
  return <DynamicMap users={users} />;
}
