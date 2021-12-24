import './Links.css'

import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'primereact/button'
import GetIcons from './Icons/GetIcons'
import { IconContext } from 'react-icons/lib'
import linksConfig from '../config/links.json'

function Links({ links }) {
  const colors = linksConfig.validIcons

  function MouseOver(e, color) {
    e.target.style.background = color
  }

  function MouseOut(e) {
    e.target.style.background = ''
  }

  return (
    <section className="flex justify-content-center mb-4">
      <div className="flex flex-column w-70">
        {links
          .filter((link) => Object.keys(colors).includes(link.icon))
          .map((link, index) => (
            <Button
              key={`link.url_${index}`}
              onMouseOver={(e) => MouseOver(e, colors[link.icon])}
              onMouseOut={MouseOut}
              className={`p-3 my-2 p-button-outlined ${link.icon}`}
              style={{ color: colors[link.icon] }}
              role="link"
              onClick={() => window.open(link.url, '_blank')}
            >
              <IconContext.Provider
                value={{
                  className: 'buttonIcon',
                }}
              >
                <GetIcons iconName={link.icon} />
              </IconContext.Provider>
              <span className="px-3">{link.name}</span>
            </Button>
          ))}
        {links
          .filter((link) => !Object.keys(colors).includes(link.icon))
          .map((link, index) => (
            <Button
              key={`link.url_${index}`}
              onMouseOver={(e) => MouseOver(e, colors[link.icon])}
              onMouseOut={MouseOut}
              className={`p-3 my-2 p-button-outlined ${link.icon}`}
              style={{ color: colors[link.icon] }}
              role="link"
              onClick={() => window.open(link.url, '_blank')}
            >
              <IconContext.Provider
                value={{
                  className: 'buttonIcon',
                }}
              >
                <GetIcons iconName={link.icon} />
              </IconContext.Provider>
              <span className="px-3">{link.name}</span>
            </Button>
          ))}
      </div>
    </section>
  )
}

Links.propTypes = {
  links: PropTypes.array.isRequired,
}

export default Links
