import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ProgressBar } from 'primereact/progressbar'

import ProfilePage from './ProfilePage'
import Placeholder from './Placeholder'
import ErrorPage from './ErrorPage'

function User() {
  const [showProgress, setShowProgress] = useState(true)
  const [skeleton, setskeleton] = useState(true)
  const [profile, setProfile] = useState()
  const [error, setError] = useState(false)
  const { username } = useParams()

  useEffect(() => {
    fetch(`/data/${username}.json`)
      .then((response) => response.json())
      .then((data) => setProfile(data))
      .catch(() => setError(true))
      .finally(() => {
        setShowProgress(false)
        setTimeout(() => setskeleton(false), 500)
      })
  }, [username])

  return (
    <main>
      {showProgress && <ProgressBar mode="indeterminate" />}
      {skeleton && <Placeholder />}
      {error && <ErrorPage />}
      {!error && !skeleton && (
        <ProfilePage profile={profile} username={username} />
      )}
    </main>
  )
}

export default User
