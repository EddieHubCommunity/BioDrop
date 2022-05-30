import React from 'react'
import { Link } from 'react-router-dom'

import Navbar from './Navbar'
import GetIcons from './Icons/GetIcons'

function Home() {
  return (
    <>
      <Navbar
        start={
          <Link to="/search" aria-label="Search">
            <GetIcons iconName="search" size={20} />
          </Link>
        }
      />
      <h2 className="text-4xl text-center">
        LinkFree connects audiences to all of your content with just one link
      </h2>
      <p className="text-2xl text-center">
        It is an open-source alternative to Linktree implemented in JavaScript
      </p>
      <p className="text-1xl text-center">
        Example profile of <Link to="/eddiejaoude">Eddie Jaoude</Link>. Want to
        add your profile, read the{' '}
        <a href="https://github.com/EddieHubCommunity/LinkFree#-to-add-your-profile">
          instructions
        </a>
        .
      </p>
      <img
        className="max-w-screen"
        src="/mockup.png"
        alt="Exapmle of the LinkFree app on Apple devices"
      />
    </>
  )
}

export default Home
