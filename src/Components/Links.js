import './Links.css'

import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'primereact/button'
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
    <section className="p-d-flex p-jc-center p-mb-4">
      <div className="p-d-flex p-flex-column w-70">
        {links
          .filter((link) =>
            Object.keys(colors).includes(link.icon?.toLowerCase()),
          )
          .map((link, index) => {
            const icon = link.icon.toLowerCase()
            return (
              <Button
                key={`link.url_${index}`}
                onMouseOver={(e) => MouseOver(e, colors[icon])}
                onMouseOut={MouseOut}
                className={`p-p-3 p-my-2 p-button-outlined ${icon}`}
                style={{ color: colors[icon] }}
                role="link"
                onClick={() => window.open(link.url, '_blank')}
              >
                <i className={`pi pi-${icon} p-px-2`}></i>
                <span className="p-px-3">{link.name}</span>
              </Button>
            )
          })}
        {links
          .filter(
            (link) => !Object.keys(colors).includes(link.icon?.toLowerCase()),
          )
          .map((link, index) => {
            const icon = link.icon.toLowerCase()
            return (
              <Button
                key={`link.url_${index}`}
                onMouseOver={(e) => MouseOver(e, colors[icon])}
                onMouseOut={MouseOut}
                className={`p-p-3 p-my-2 p-button-outlined ${icon}`}
                style={{ color: colors[icon] }}
                role="link"
                onClick={() => window.open(link.url, '_blank')}
              >
                <i className={`pi pi-${icon} p-px-2`}></i>
                <span className="p-px-3">{link.name}</span>
              </Button>
            )
          })}
      </div>
    </section>
  )
}

Links.propTypes = {
  links: PropTypes.array.isRequired,
}

export default Links
