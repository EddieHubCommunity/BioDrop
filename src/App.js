import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import Profile from "./Components/Profile";

import SocialLinkBar from "./Components/SocialLinkBar";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch("./data/eddiejaoude.json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);

  return (
    <div className="p-m-4">
      <Profile name={data.name} avatar={data.avatar} />
      <SocialLinkBar links={data.links} />
    </div>
  );
}

export default App;
