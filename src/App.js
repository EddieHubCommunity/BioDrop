import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'

import Footer from './Components/Footer'
import User from './Components/UserProfile/User'
import Home from './Components/Home'
import Search from './Components/Search/Search'
import user from './config/user.json'
import { useTheme } from './ThemeContext'

function App() {
  const darkTheme = useTheme()
  const body = document.querySelector('body')

  const theme = {
    color: `${darkTheme ? 'white' : 'black'}`,
  }

  body.style.backgroundColor = `${darkTheme ? '#202023' : 'white'}`

  return (
    <Router>
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossOrigin="anonymous"
          async
        />
      </head>

      <div className="p-2 md:p-4 max-h-screen" style={theme}>
        {user.username && <User singleUser={user} />}
        {!user.username && (
          <Switch>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/:username">
              <User />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        )}
        <Footer />
      </div>
    </Router>
  )
}

export default App
