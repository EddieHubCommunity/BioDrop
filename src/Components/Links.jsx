import './Links.css'

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

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
      <div
        className="p-d-flex p-flex-column"
        style={{ width: 70 + '%', maxWidth: 45 + 'rem' }}
      >
        {links
          .filter((link) => Object.keys(colors).includes(link.icon))
          .map((link, index) => (
            <Link
              to={{ pathname: link.url }}
              target="_blank"
              key={`link.url_${index}`}
            >
              <Button
                onMouseOver={(e) => {
                  MouseOver(e, colors[link.icon])
                }}
                onMouseOut={MouseOut}
                className={`p-p-3 p-m-2 p-button-outlined ${link.icon}`}
                style={{ color: colors[link.icon] }}
                role="link"
              >
                <i className={`pi pi-${link.icon} p-px-2`}></i>
                <span className="p-px-3">{link.name}</span>
              </Button>
            </Link>
          ))}
        {links
          .filter((link) => !Object.keys(colors).includes(link.icon))
          .map((link, index) => (
            <Link
              to={{ pathname: link.url }}
              target="_blank"
              key={`link.url_${index}`}
            >
              <Button
                className="p-p-3 p-m-2 p-button-outlined unknown"
                role="link"
              >
                <i className="pi pi-arrow-right p-px-2"></i>
                <span className="p-px-3">{link.name}</span>
              </Button>
            </Link>
          ))}
      </div>
    </section>
  )
}

Links.propTypes = {
  links: PropTypes.array.isRequired,
}

export default Links
