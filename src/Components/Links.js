import './Links.css'

import React from 'react'
import PropTypes from 'prop-types'

import LinkButton from './Buttons'

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
    <section className="p-d-flex p-jc-center p-mb-4">
      <div className="p-d-flex p-flex-column" style={{ width: 70 + '%', maxWidth: 45 + 'rem' }}>
        {links
          .filter((link) => Object.keys(colors).includes(link.icon))
          .map((link, index) => (
            <LinkButton
              key={`link.url_${index}`}
               onClick={goToLinkHandle}
              colors={colors}
              link={link}
            />
          ))}
      </div>
    </section>
  )
}

Links.propTypes = {
  links: PropTypes.array.isRequired,
}

export default Links
