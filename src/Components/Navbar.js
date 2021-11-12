import './Navbar.css'

import React from 'react'
import PropTypes from 'prop-types'

import { Menubar } from 'primereact/menubar'

function Navbar({ items, start, end }) {
  if (!end) {
    end = (
      <div className="p-d-flex p-jc-center p-ai-center p-pr-2">
        <div className="p-p-1"> Contribute on </div>
        <a
          href="https://github.com/EddieHubCommunity/LinkFree"
          className="p-p-1"
        >
          <i className="pi pi-github" style={{ fontSize: '1em' }}></i>
        </a>
        <div>v0.0.0</div>
      </div>
    )
  }

  return (
    <Menubar
      model={items}
      start={start}
      end={end}
      className="p-mb-4 p-flex-wrap p-jc-center"
    />
  )
}

Navbar.propTypes = {
  items: PropTypes.array,
  start: PropTypes.object,
  end: PropTypes.object,
}

export default Navbar
