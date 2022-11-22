import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import Navbar from './Navbar'
import GetIcons from './Icons/GetIcons'
import { useTheme } from '../ThemeContext'
import { Accordion, AccordionTab } from 'primereact/accordion'

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
        <p className="text-center">
          <img
            className="max-w-full"
            src="/mockup.png"
            alt="An Example of the LinkFree app on Apple devices"
          />
        </p>
        <Accordion>
          <AccordionTab header="What is LinkFree">
            LinkFree is an openSource project that allows you to use a single
            link to share all your content(blog,youtube channel,social media) as
            a content creator to your audience.
          </AccordionTab>
          <AccordionTab header="Why do i need LinkFree">
            You need LinkFree because it connects you with your audience with
            just a single link and it equally gives you the opportunity to
            contribute to its openSource Projects.
          </AccordionTab>
          <AccordionTab header="How do i contribute to the LinkFree openSource project">
            You can Contribute to the LinkFree openSource project by clicking on
            this Link{' '}
            <a href="https://github.com/EddieHubCommunity/LinkFree/blob/main/docs/contributing/CONTRIBUTING.md">
              contribution guidlines
            </a>
          </AccordionTab>
        </Accordion>
      </main>
    </>
  )
}

export default Home
