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
        Contribute on{' '}
        <a href="https://github.com/EddieHubCommunity/LinkFree">
          <i className="pi pi-github" aria-hidden="true"></i>
        </a>
        v{version}
      </p>
    </div>
  )
}

export default Footer
