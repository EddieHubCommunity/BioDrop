import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from 'react-router-dom'

import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import Footer from './Components/Footer'
import User from './Components/UserProfile/User'
import Home from './Components/Home/Home'
import { GlobalProvider } from './Store/Context'

function App() {
  const history = useHistory()

  return (
    <GlobalProvider>
      <Router history={history}>
        <div className="p-m-2 p-m-md-4">
          <Switch>
            <Route path="/:username">
              <User />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </GlobalProvider>
  )
}

export default App
