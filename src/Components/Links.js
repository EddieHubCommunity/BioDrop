import './Links.css'
import React from 'react'
import PropTypes from 'prop-types'
import StyledLink from './StyledLink'
import GetIcons from './Icons/GetIcons'
import { IconContext } from 'react-icons/lib'
import linksConfig from '../config/links.json'
import { useTheme } from '../ThemeContext'

function Links({ links }) {
  const colors = linksConfig.validIcons
  const darkTheme = useTheme()

  function MouseOver(e, color) {
    e.target.style.background = color
  }

  function MouseOut(e) {
    e.target.style.background = ''
  }

  return (
    <section className="flex justify-content-center mb-4">
      <div className="flex flex-column sm:w-9 md:w-7">
        {links
          .filter((link) => Object.keys(colors).includes(link.icon))
          .map((link, index) => (
            <StyledLink
              key={`link.url_${index}`}
              onMouseOver={(e) => MouseOver(e, colors[link.icon])}
              onMouseOut={MouseOut}
              className={`p-3 my-2 p-button-outlined ${link.icon}`}
              style={{
                color:
                  colors[link.icon] === 'links' || darkTheme
                    ? 'white'
                    : colors[link.icon],
              }}
              rel={link.rel ? link.rel : null}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconContext.Provider
                value={{
                  className: 'buttonIcon',
                }}
              >
                <GetIcons iconName={link.icon} />
              </IconContext.Provider>
              <span className="px-3">{link.name}</span>
            </StyledLink>
          ))}
        {links
          .filter((link) => !Object.keys(colors).includes(link.icon))
          .map((link, index) => (
            <StyledLink
              key={`link.url_${index}`}
              onMouseOver={(e) => MouseOver(e, colors.globe)}
              onMouseOut={MouseOut}
              className={`p-3 my-2 p-button-outlined ${link.icon}`}
              style={{ color: colors.globe }}
              rel={link.rel ? link.rel : null}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconContext.Provider
                value={{
                  className: 'buttonIcon',
                }}
              >
                <GetIcons iconName={link.icon} />
              </IconContext.Provider>
              <span className="px-3">{link.name}</span>
            </StyledLink>
          ))}
      </div>
    </section>
  )
}

Links.propTypes = {
  links: PropTypes.array.isRequired,
}

export default Links
