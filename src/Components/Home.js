import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import Navbar from './Navbar'
import GetIcons from './Icons/GetIcons'
import { useTheme } from '../ThemeContext'

document.addEventListener('keydown', (e) => {
  e = e || window.event
  const searchbox = document.getElementById('search-button')
  if (e.key === 'k' && e.ctrlKey) {
    searchbox.click()
    e.preventDefault()
  }
})

function Home() {
  const darkTheme = useTheme()

  return (
    <>
      <header>
        <Navbar
          start={
            <Link id="search-button" to="/search" aria-label="Search">
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
          See <Link to="/eddiejaoude">Eddie Jaoude&apos;s</Link> profile for an
          example. Want to add your profile? Read the{' '}
          <a href="https://github.com/EddieHubCommunity/LinkFree#-to-add-your-profile">
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
