import dynamic from "next/dynamic";

//this is required as leaflet is not compatible with SSR
const DynamicMap = dynamic(() => import("../components/map/map"), {
  ssr: false,
});

//hardcoded my name for testing - replace with API
export async function getServerSideProps(context) {
  let users = [];
  let allUsers = [];
  let usersWithLoc = [];
  try {
//get all users
const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users?page=1`);
     allUsers = await res.json();
     let sample = allUsers.slice(0,10);
console.log(sample)
usersWithLoc = await Promise.all(
  sample.map(async(user) =>{
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${user.username}/`
    );
    
    users = await response.json();
    
   return users
  })
)

  } catch (e) {
    console.log("ERROR search users", e);
  }

  return {
    props: { usersWithLoc },
  };
}

export default function Map({usersWithLoc}) {
  return <DynamicMap users={usersWithLoc} />;
}
