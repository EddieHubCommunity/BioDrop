import './Links.css'

import React from 'react'
import PropTypes from 'prop-types'

import { Button } from 'primereact/button'
import icons from './Icons'

function Links({ links }) {
  const goToLinkHandle = (url) => {
    window.open(url, '__blank').focus()
  }

  return (
    <section className="p-d-flex p-jc-center p-mb-4">
      <div className="p-d-flex p-flex-column" style={{ width: 70 + '%', maxWidth: 45 + 'rem' }}>
        {links
          .filter((link) => Object.keys(icons).includes(link.icon))
          .map((link, index) => (
            <Button
              className={`p-p-3 p-m-2 p-button-outlined ${link.icon}`}
              style={{ color: icons[link.icon].color }}
              key={`link.url_${index}`}
              onClick={() => goToLinkHandle(link.url)}
              role="link"
            >
              {icons[link.icon].icon}
              <span className="p-px-3">{link.name}</span>
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
