import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import { Avatar } from "primereact/avatar";
import { Badge } from "primereact/badge";

function App() {
  return (
    <div className="p-m-4">
      <div className="p-d-flex p-jc-center p-ai-center">
        <Avatar
          image="eddiejaoude.jpg"
          size="xlarge"
          shape="circle"
          className="p-overlay-badge"
        >
          <Badge value="4" severity="info" />
        </Avatar>
      </div>
      <div className="p-d-flex p-jc-center">
        <p>Founder of EddieHub</p>
      </div>
    </div>
  );
}

export default App;
