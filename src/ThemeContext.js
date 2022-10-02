import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
const ThemeContext = React.createContext()
const ThemeUpdateContext = React.createContext()

export function useTheme() {
  return useContext(ThemeContext)
}

export function useThemeUpdate() {
  return useContext(ThemeUpdateContext)
}

export function ThemeProvider({ children }) {
  const [darkTheme, setDarkTheme] = useState(false)

  function toggleTheme() {
    setDarkTheme((prevTheme) => !prevTheme)
  }

  return (
    <ThemeContext.Provider value={darkTheme}>
      <ThemeUpdateContext.Provider value={toggleTheme}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  )
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
