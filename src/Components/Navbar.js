import './Navbar.css'

import React from 'react'
import PropTypes from 'prop-types'

import { Menubar } from 'primereact/menubar'

function Navbar({ items, start, end }) {
  if (!end) {
    end = (
      <a href="https://github.com/EddieHubCommunity/LinkFree" aria-label="View source on GitHub">
        <i className="pi pi-github" style={{ fontSize: '2em' }}></i>
      </a>
    )
  }

  return <Menubar model={items} start={start} end={end} className="p-mb-4" />
}

Navbar.propTypes = {
  items: PropTypes.array,
  start: PropTypes.object,
  end: PropTypes.object,
}

export default Navbar
