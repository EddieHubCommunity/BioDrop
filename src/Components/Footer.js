import React, { useState, useEffect } from 'react'
import GetIcons from './Icons/GetIcons'
import ScrollToTopBtn from './ScrollToTopBtn'
import { useTheme } from '../ThemeContext'

function Footer() {
  const darkTheme = useTheme()
  const [version, setVersion] = useState('')
  useEffect(() => {
    fetch('/app.json')
      .then((response) => response.json())
      .then((data) => setVersion(data.version))
      .catch((error) => {
        console.log('Footer useEffect', error)
        alert('An error occurred please try again later.')
      })
  }, [])

  return (
    <footer className="flex justify-content-center align-items-center py-3">
      <span className="mr-2">Contribute on</span>
      <Link
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
        to={{ pathname: 'https://github.com/EddieHubCommunity/LinkFree' }}
        target="_blank"
        className="mr-2"
        aria-label="LinkFree repository on GitHub"
      >
        <GetIcons
          className={`${darkTheme ? 'text-white' : 'text-gray-900'}`}
          iconName="github"
          size={16}
        />
      </Link>
      <span>v{version}</span>
      <ScrollToTopBtn />
    </footer>
  )
}

export default Footer
