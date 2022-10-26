import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import Navbar from './Navbar'
import GetIcons from './Icons/GetIcons'
import { useTheme } from '../ThemeContext'
import Accordion from 'react-bootstrap/Accordion'
function Home() {
  const darkTheme = useTheme()

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
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>What is LinkFree</Accordion.Header>
            <Accordion.Body>
              LinkFree is an openSource project that allows you to use a single
              link to share all content(blog,youtube channel,social media) as a
              content creator to your audience
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Why do i need LinkFree</Accordion.Header>
            <Accordion.Body>
              You need LinkFree because it connect you with your audience with
              just a single link and it equally gives you the opportunity to
              contribute to its openSource Projects
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              How do i contribute to the LinkFree openSource project
            </Accordion.Header>
            <Accordion.Body>
              You can Contribute to the LinkFree openSource project by clicking
              on this Link{' '}
              <a href="https://github.com/EddieHubCommunity/LinkFree/blob/main/docs/contributing/CONTRIBUTING.md">
                contribution guidlines
              </a>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </main>
    </>
  )
}

export default Home
