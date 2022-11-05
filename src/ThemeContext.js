import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
const ThemeContext = React.createContext()
const ThemeUpdateContext = React.createContext()

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => setMatches(media.matches)
    media.addListener(listener)
    return () => media.removeListener(listener)
  }, [matches, query])
  return matches
}

export function useTheme() {
  return useContext(ThemeContext)
}

export function useThemeUpdate() {
  return useContext(ThemeUpdateContext)
}

export function ThemeProvider({ children }) {
  const [darkTheme, setDarkTheme] = useState(false)
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  function toggleTheme() {
    setDarkTheme((prevTheme) => !prevTheme)
  }

  useEffect(() => {
    setDarkTheme(prefersDarkMode)
  }, [prefersDarkMode])

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
