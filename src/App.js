import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import React, { useState, useEffect } from "react";

import Profile from "./Components/Profile";
import Links from "./Components/Links";
function App() {
  const [profile, setProfile] = useState({
    name: "404",
    bio: "-",
    avatar:
      "https://user-images.githubusercontent.com/624760/114314271-ea156a80-9af1-11eb-97ca-977be7565aa6.png",
    links: [],
  });

  useEffect(() => {
    fetch("/data/eddiejaoude.json")
      .then((response) => response.json())
      .then((data) => setProfile(data));
  }, []);
  return (
    <div className="p-m-4">
      <Profile bio={profile.bio} avatar={profile.avatar} name={profile.name} />
      <Links />
    </div>
  );
}

export default App;
