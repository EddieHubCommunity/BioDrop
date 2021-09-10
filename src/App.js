import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Footer from "./Components/Footer";
import Socials from "./Components/Socials";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:username">
          <div className="p-m-4">
            <Socials />
          </div>
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
