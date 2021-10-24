import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ProgressBar } from 'primereact/progressbar'

import ProfilePage from './ProfilePage'
import Placeholder from './Placeholder'
import ErrorPage from './ErrorPage'

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
        return <ErrorPage/>
      })
      .finally(() => {
        setShowProgress(false)
        setTimeout(() => {
          setskeleton(false)
        }, 500)
      })
  }, [username])

  if (!profile) {
    return <ErrorPage/>
  } else {
    return (
    <main>
      {showProgress && <ProgressBar mode="indeterminate" />}

      {skeleton ? <Placeholder/> : <ProfilePage profile={profile} username={username} />}

    </main>
    )
  }
}

export default Socials
