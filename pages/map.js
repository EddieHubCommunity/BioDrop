import dynamic from "next/dynamic";

//this is required as leaflet is not compatible with SSR
const DynamicMap = dynamic(() => import("../components/map/map"), {
  ssr: false,
});

//testing garbage until API solution
export async function getServerSideProps(context) {
  let users = [];
  let allUsers = [];
  let usersWithLoc = [];
  try {
//get all users
const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users?page=1`);
     allUsers = await res.json();
     //increase num here to test with more data
     let sample = allUsers.slice(0,10);

usersWithLoc = await Promise.all(
  sample.map(async(user) =>{
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${user.username}/`
    );
    
    usersWithLoc = await response.json();
    
   return usersWithLoc
  })
)

  } catch (e) {
    console.log("ERROR search users", e);
  }

  return {
    props: { usersWithLoc },
  };
}
//end testing garbage api calls

export default function Map({usersWithLoc}) {
  return <DynamicMap users={usersWithLoc} />;
}
