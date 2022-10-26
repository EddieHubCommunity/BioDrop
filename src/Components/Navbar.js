import React, { useState, useEffect } from 'react'
import './Navbar.css'
import GetIcons from './Icons/GetIcons'
import PropTypes from 'prop-types'
import { Menubar } from 'primereact/menubar'
import { useTheme, useThemeUpdate } from '../ThemeContext'

function Navbar({ items, start, end }) {
  const [version, setVersion] = useState('')
  const darkTheme = useTheme()
  const toggleTheme = useThemeUpdate()

  const theme = {
    color: `${darkTheme ? 'white' : 'black'}`,
  }

  useEffect(() => {
    fetch('/app.json')
      .then((response) => response.json())
      .then((data) => setVersion(data.version))
      .catch((error) => {
        console.log('Navbar useEffect', error)
        alert('An error occurred, please try again later.')
      })
  }, [])

  if (!end) {
    end = (
      <div className="flex justify-content-center align-items-center pr-2">
        <a
          href="https://github.com/EddieHubCommunity/LinkFree"
          target="_blank"
          className="mr-2"
          aria-label="LinkFree repository on GitHub"
          rel="noreferrer"
        >
          <GetIcons
            className={`${darkTheme ? 'text-white' : 'text-gray-900'}`}
            iconName="github"
            size={16}
          />
        </a>

        <div style={theme}>v{version}</div>

        <div className="theme--button">
          {darkTheme
            ? (
            <GetIcons
              iconName="moon"
              className="text-white"
              onClick={toggleTheme}
              size={20}
            />
              )
            : (
            <GetIcons iconName="sun" onClick={toggleTheme} size={20} />
              )}
        </div>
      </div>
    )
  }

  return (
    <Menubar
      model={items}
      start={start}
      end={end}
      style={{
        backgroundColor: `${darkTheme ? '#181818' : 'white'}`,
        border: `${darkTheme ? 'none' : '1px solid #dee2e6'}`,
      }}
      className="mb-4 flex-wrap justify-content-center"
    />
  )
}

Navbar.propTypes = {
  items: PropTypes.array,
  start: PropTypes.object,
  end: PropTypes.object,
}

export default Navbar
