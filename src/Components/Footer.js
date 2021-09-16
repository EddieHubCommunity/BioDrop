import React, { useState, useEffect } from 'react'

function Footer() {
  const [version, setVersion] = useState('')
  useEffect(() => {
    fetch('/app.json')
      .then((response) => response.json())
      .then((data) => setVersion(data.version))
  }, [])

  return (
    <div className="p-d-flex p-jc-center p-ai-center">
      <p>
        <span className="p-mr-2">Contribute on</span>
        <a
          href="https://github.com/EddieHubCommunity/LinkFree"
          className="p-mr-2"
        >
          <i className="pi pi-github" aria-hidden="true"></i>
        </a>
        <span>v{version}</span>
      </p>
    </div>
  )
}

export default Footer
