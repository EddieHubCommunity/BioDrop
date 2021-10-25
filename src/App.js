import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Footer from './Components/Footer'
import User from './Components/UserProfile/User'
import Home from './Components/Home/Home'

function App() {
  return (
    <div className="p-m-4">
      <Router>
        <Switch>
          <Route path="/:username">
            <User />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  )
}

export default App
