import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import React, { useReducer } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from 'react-router-dom'

import Footer from './Components/Footer'
import Socials from './Components/Socials'
import Home from './Components/Home/Home'
import GlobalState, { reducer } from './Store/Context'

function App() {
  const [list, setList] = useReducer(reducer, [])
  const history = useHistory()

  return (
    <GlobalState initialState={list} dispatch={setList}>
      <Router history={history}>
        <div className="p-m-4">
          <Switch>
            <Route path="/:username">
              <Socials />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </GlobalState>
  )
}

export default App
