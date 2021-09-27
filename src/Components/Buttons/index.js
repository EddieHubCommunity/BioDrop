import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import { Button } from 'primereact/button'
import * as VanillaTilt from 'vanilla-tilt'

import './styles.css'

const LinkButton = ({ colors, link, onClick }) => {
  useEffect(() => {
    VanillaTilt.init(document.querySelectorAll('.tilt'), {
      max: 2,
      speed: 200,
      glare: true,
    })
  }, [])

  return (
    <Button
      className="p-p-3 p-m-2 p-button-outlined link-btn tilt"
      style={{ color: colors[link.icon] }}
      onClick={() => onClick(link.url)}
      role="link"
    >
      <i className={`pi pi-${link.icon} p-px-2`}></i>
      <span className="p-px-3">{link.name}</span>
    </Button>
  )
}

LinkButton.propTypes = {
  colors: PropTypes.object.isRequired,
  link: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default LinkButton
