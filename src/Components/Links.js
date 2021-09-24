import React from 'react'
import PropTypes from 'prop-types'

import { Button } from 'primereact/button'

function Links({ links }) {
  const colors = {
    youtube: '#FF0000',
    twitter: '#00ACEE',
    github: '#171515',
    instagram: '#E4405F',
  }

  const goToLinkHandle = (url) => {
    window.open(url, '__blank').focus()
  }

  return (
    <section className="p-d-flex p-jc-center">
      <div className="p-d-flex p-flex-column" style={{ width: 70 + '%' }}>
        {links
          .filter((link) => Object.keys(colors).includes(link.icon))
          .map((link, index) => (
            <Button
              className="p-p-3 p-m-2 p-button-outlined"
              style={{ color: colors[link.icon] }}
              key={`link.url_${index}`}
              onClick={() => goToLinkHandle(link.url)}
              p-link
              role="link"
            >
              <i className={`pi pi-${link.icon} p-px-2`}></i>
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
