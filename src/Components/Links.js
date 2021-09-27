import './Links.css'

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

  const bgcolors = {
    youtube: 'rgb(255, 55, 55)',
    twitter: 'rgb(27, 186, 249)',
    github: 'rgb(45, 45, 45)',
    instagram: '#E4405F',
  }

  const goToLinkHandle = (url) => {
    window.open(url, '__blank').focus()
  }

  return (
    <section className="p-d-flex p-jc-center p-mb-4">
      <div className="p-d-flex p-flex-column" style={{ width: 70 + '%', maxWidth: 45 + 'rem' }}>
        {links
          .filter((link) => Object.keys(colors).includes(link.icon))
          .map((link, index) => (
            <Button
              className="p-p-3 p-m-2 p-button-outlined"
              style={{ color: 'white', backgroundColor: bgcolors[link.icon] }}
              key={`link.url_${index}`}
              onClick={() => goToLinkHandle(link.url)}
              role="link"
            >
              <i className={`pi pi-${link.icon} p-px-2` } style= {{ fontSize: '30px' }} ></i>
              <span className="p-px-3 p-text-bold">{link.name}</span>
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
