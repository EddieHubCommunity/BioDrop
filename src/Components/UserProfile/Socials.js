import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ProgressBar } from 'primereact/progressbar'

import ProfilePage from './ProfilePage'
import Placeholder from './Placeholder'

function Socials() {
  const [showProgress, setShowProgress] = useState(true)
  const { username } = useParams()

  const [profile, setProfile] = useState({})
  const [skeleton, setskeleton] = useState(true)


  useEffect(() => {
    fetch(`/data/${username}.json`)
      .then((response) => response.json())
      .then((data) => setProfile(data))

      .catch((error) => {
        console.log('Socials useEffect', error)
        alert('An error occurred please try again later.')
      })
      .finally(() => {
        setShowProgress(false)
        setTimeout(() => {
          setskeleton(false)
        }, 500)
      })
  }, [username])

  if (!profile) {
    return <div className="p-text-center">
        <div className="flex-column">
        <img src='/eddiehub_community_logo.webp' alt="image" style={{ width: '150px' }}/>
        <h1>Profile not found.</h1>
        <h1>If you are a new user, please consider registering at LinkFree.</h1>
        <h2>Read the documendation <a href="https://github.com/EddieHubCommunity/LinkFree#readme" target="_blank" rel="noreferrer">here</a>.</h2>
      </div>
    </div>
  } else {
    return (
    <main>
      {showProgress && <ProgressBar mode="indeterminate" />}

      {skeleton ? <Placeholder list={profile}/> : <ProfilePage list={profile} />}

    </main>
    )
  }
}

export default Socials
