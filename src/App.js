import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'

import Footer from './Components/Footer'
import User from './Components/UserProfile/User'
import Home from './Components/Home/Home'

function App() {
  const [list, setList] = useState([])

  useEffect(() => {
    fetch('/list.json')
      .then((response) => response.json())
      .then((data) => setList(data))
  }, [])

  return (
    <>
      <Router>
        <div className="m-2 md:m-4">
          <Switch>
            {
              list && list.length === 1
                ? <Route path="/">
                    <User />
                  </Route>
                : <>
                    <Route path="/:username">
                      <User />
                    </Route>
                    <Route path="/">
                      <Home />
                    </Route>
                  </>
            }
          </Switch>
          <Footer />
        </div>
      </Router>
    </>
  )
}

export default App
