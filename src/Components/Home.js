import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import Navbar from './Navbar'
import GetIcons from './Icons/GetIcons'
import { useTheme } from '../ThemeContext'

function Home() {
  const darkTheme = useTheme()

  const darkModeLinkColor = {
    color: darkTheme ? '#219ebc' : '#355070',
  }

  return (
    <>
      <header>
        <Navbar
          start={
            <Link to="/search" aria-label="Search">
              <GetIcons
                iconName="search"
                className={`${darkTheme ? 'text-white' : 'text-gray-900'}`}
                size={20}
              />
            </Link>
          }
        />
      </header>
      <main>
        <h1 className="text-4xl text-center">
          LinkFree connects audiences to all of your content with just one link
        </h1>
        <p className="text-2xl text-center">
          It is an open-source alternative to Linktree implemented in JavaScript
        </p>
        <p className="text-1xl text-center">
          See <Link to="/eddiejaoude"><span style={darkModeLinkColor}>Eddie Jaoude&apos;s</span></Link> profile for an
          example. Want to add your profile? Read the{' '}
          <a href="https://github.com/EddieHubCommunity/LinkFree#-to-add-your-profile" style={darkModeLinkColor}>
            instructions
          </a>
          .
        </p>
        <p className="text-center">
          <img
            className="max-w-full"
            src="/mockup.png"
            alt="An Example of the LinkFree app on Apple devices"
          />
        </p>
      </main>
    </>
  )
}

export default Home
