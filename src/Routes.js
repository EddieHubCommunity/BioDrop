import React from 'react'
import Footer from './Components/Layout/Footer/Footer'
import User from './Components/UserProfile/User'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home/Home'

const Routes = () => {
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

export default Routes
