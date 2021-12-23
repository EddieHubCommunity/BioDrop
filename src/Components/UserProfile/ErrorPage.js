import React from 'react'

function ErrorPage() {
  return (
    <div className="text-center">
      <div className="flex flex-column">
        <img
          src="/eddiehub_community_logo.webp"
          alt="image"
          style={{ width: '150px' }}
        />
        <h1>Profile not found.</h1>
        <h1>If you are a new user, please consider registering at LinkFree.</h1>
        <h2>
          Read the documentation{' '}
          <a
            href="https://github.com/EddieHubCommunity/LinkFree#readme"
            target="_blank"
            rel="noreferrer"
          >
            here
          </a>
          .
        </h2>
      </div>
    </div>
  )
}

export default ErrorPage
