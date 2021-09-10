import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import { Button } from "primereact/button";

import Profile from "./Components/Profile";

function App() {
  return (
    <div className="p-m-4">
      <Profile />

      <div className="p-d-flex p-jc-center">
        <div className="p-d-flex p-flex-column">
          <Button className="p-p-3">
            <i className="pi pi-youtube p-px-2"></i>
            <span className="p-px-3">Youtube</span>
          </Button>
          <Button className="p-p-3">
            <i className="pi pi-twitter p-px-2"></i>
            <span className="p-px-3">Twitter</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
