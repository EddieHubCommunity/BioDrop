import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaGithub } from 'react-icons/fa'

function Footer() {
  const [version, setVersion] = useState('')
  useEffect(() => {
    fetch('/app.json')
      .then((response) => response.json())
      .then((data) => setVersion(data.version))
      .catch((error) => {
        console.log('Footer useEffect', error)
        alert('An error occurred please try again later.')
      })
  }, [])

  return (
    <footer className="p-d-flex p-jc-center p-ai-center">
      <p>
        <span className="p-mr-2">Contribute on</span>
        <Link
          to={{ pathname: 'https://github.com/EddieHubCommunity/LinkFree' }}
          target="_blank"
          className="p-mr-2"
          aria-label="LinkFree repository on GitHub"
        >
          <FaGithub size={16} />
        </Link>
        <span>v{version}</span>
      </p>
    </footer>
  )
}

export default Footer
