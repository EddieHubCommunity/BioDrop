import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { Avatar } from "primereact/avatar";
import { Badge } from "primereact/badge";

function App() {
  return (
    <div>
      <Avatar image="eddiejaoude.jpg" size="xlarge">
        <Badge value="4" severity="danger" />
      </Avatar>
    </div>
  );
}

export default App;
