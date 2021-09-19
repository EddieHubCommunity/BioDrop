import React from 'react'
import PropTypes from 'prop-types'

import { Button } from 'primereact/button'
import { Avatar } from 'primereact/avatar'

function Links({ links }) {
  const colors = {
    youtube: '#FF0000',
    twitter: '#00ACEE',
    github: '#171515',
    linkedin: '#0a66c2',
  }

  const goToLinkHandle = (url) => {
    window.open(url, '__blank').focus()
  }

  return (
    <div className="p-d-flex p-jc-center">
      <div className="p-d-flex p-flex-column" style={{ width: 70 + '%' }}>
        {links
          .filter((link) => Object.keys(colors).includes(link.icon))
          .map((link, index) => (
            <Button
              className="p-p-3 p-m-2 p-button-outlined"
              style={{ color: colors[link.icon] }}
              key={`link.url_${index}`}
              onClick={() => goToLinkHandle(link.url)}
            >
              {!link.isLinkIcon ? <i className={`pi pi-${link.icon} p-px-2`}></i> : null}
              {link.iconLink ? <Avatar shape="circle" className='p-px-1' image={link.iconLink} /> : null}
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
