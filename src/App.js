import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

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
    <BrowserRouter>
      <div className="p-2 md:p-4 max-h-screen" style={theme}>
        {user.username && <User singleUser={user} />}
        {!user.username && (
          <Routes>
            <Route path="/search" element={<Search />} />
            <Route path="/:username" element={<User />} />
            <Route path="/" element={<Home />} />
          </Routes>
        )}
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
