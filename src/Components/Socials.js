import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ProgressBar } from 'primereact/progressbar'

import Profile from './Profile'
import Links from './Links'
import Milestones from './Milestones'

function Socials() {
  const [showProgress, setShowProgress] = useState(true)
  const { username } = useParams()
  const [profile, setProfile] = useState()

  useEffect(() => {
    fetch(`/data/${username}.json`)
      .then((response) => response.json())
      .then((data) => setProfile(data))
      .catch((error) => console.log('Socials useEffect', error))
      .finally(() => setShowProgress(false))
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
      {!showProgress && (
        <>
          <Link to="/" aria-label="Go back to Home"><i className="pi pi-arrow-left"></i></Link>
          <Profile
            bio={profile.bio}
            avatar={profile.avatar}
            name={profile.name}
            total={profile.links.length}
          />
          <Links links={profile.links} />
        </>
      )}
      {profile.milestones && <Milestones milestones={profile.milestones} />}
    </main>
    )
  }
}

export default Socials
