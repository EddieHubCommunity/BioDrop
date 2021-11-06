import './Navbar.css'

import React from 'react'
import PropTypes from 'prop-types'

import { Menubar } from 'primereact/menubar'

function Navbar({ items, start, end }) {
  if (!end) {
    end = (
      <a href="https://github.com/EddieHubCommunity/LinkFree">
        <i className="pi pi-github" style={{ fontSize: '2em' }}></i>
      </a>
    )
  }

  if (!items) {
    items = [
      {
        label: 'Contribute on Github',
        icon: 'pi pi-fw pi-github',
      },
    ]
  }
  // if (!end) {
  //   end = (

  //     <div className="p-d-flex p-ai-center">  <span className="p-mr-2">Contribute on </span>
  //     <a href="https://github.com/EddieHubCommunity/LinkFree">
  //       <i className="pi pi-github" style={{ fontSize: '2em' }}></i>
  //     </a>
  //     </div>
  //   )
  // }

  return <Menubar model={items} start={start} end={end} className="p-mb-4" />
}

Navbar.propTypes = {
  items: PropTypes.array,
  start: PropTypes.object,
  end: PropTypes.object,
}

export default Navbar
