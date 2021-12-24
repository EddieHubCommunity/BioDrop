import './Navbar.css'

import React, { useState, useEffect } from 'react'

import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

import { Menubar } from 'primereact/menubar'

import GetIcons from './Icons/GetIcons'

function Navbar({ items, start, end }) {
  const [version, setVersion] = useState('')

  useEffect(() => {
    fetch('/app.json')
      .then((response) => response.json())
      .then((data) => setVersion(data.version))
      .catch((error) => {
        console.log('Navbar useEffect', error)
        alert('An error occurred, please try again later.')
      })
  }, [])

  if (!end) {
    end = (
      <div className="p-d-flex p-jc-center p-ai-center p-pr-2">
        <Link
          to={{ pathname: 'https://github.com/EddieHubCommunity/LinkFree' }}
          target="_blank"
          className="p-mr-2"
          aria-label="LinkFree repository on GitHub"
        >
          <GetIcons iconName="github" size={16} />
        </Link>

        <div>v{version}</div>
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
