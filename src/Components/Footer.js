import React, { useState, useEffect } from 'react'

function Footer() {
  const [version, setVersion] = useState('')
  useEffect(() => {
    fetch('https://api.github.com/repos/EddieHubCommunity/LinkFree/releases')
      .then((response) => response.json())
      .then((data) => setVersion(data[0].tag_name))
  }, [])

  return (
    <footer className="p-d-flex p-jc-center p-ai-center">
      <p>
        <span className="p-mr-2">Contribute on</span>
        <a
          href="https://github.com/EddieHubCommunity/LinkFree"
          className="p-mr-2"
          aria-label="LinkFree repository on GitHub"
        >
          <i className="pi pi-github" aria-hidden="true"></i>
        </a>
        <span>{version || 'v0.0.0'}</span>
      </p>
    </footer>
  )
}

export default Footer
