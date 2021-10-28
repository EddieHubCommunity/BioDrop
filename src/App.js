import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import Footer from './Components/Footer'
import User from './Components/UserProfile/User'
import Home from './Components/Home/Home'

function App() {
  return (
    <Router>
      <div className="p-m-4">
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
  )
}

export default App
