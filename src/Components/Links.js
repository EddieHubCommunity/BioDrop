import React from 'react'
import PropTypes from 'prop-types'

import { Button } from 'primereact/button'

function Links({ links }) {
  const colors = {
    youtube: 'red',
    twitter: 'blue',
    github: 'green',
  }

  const goToLinkHandle = (url) => {
    window.open(url, '__blank').focus()
  }

  return (
    <div className="p-d-flex p-jc-center">
      <div className="p-d-flex p-flex-column" style={{ width: 70 + '%' }}>
        {links.map((link, index) => (
          <Button
            className="p-p-3 p-m-2 p-button-outlined"
            style={{ color: colors[link.icon] }}
            key={`link.url_${index}`}
            onClick={() => goToLinkHandle(link.url)}
          >
            <i className={`pi pi-${link.icon} p-px-2`}></i>
            <span className="p-px-3">{link.name}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}

Links.propTypes = {
  links: PropTypes.array.isRequired,
}

export default Links
