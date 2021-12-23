import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ProgressBar } from 'primereact/progressbar'

import ProfilePage from './ProfilePage'
import Placeholder from './Placeholder'
import ErrorPage from './ErrorPage'
import Navbar from '../Navbar'
import GetIcons from '../Icons/GetIcons'

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
    <>
      <Navbar
        start={
          <Link to="/" aria-label="Go back to Home">
            <GetIcons iconName="arrowLeft" size={20} />
          </Link>
        }
      />
      <main>
        {showProgress && <ProgressBar mode="indeterminate" />}
        {skeleton && <Placeholder />}
        {error && <ErrorPage />}
        {!error && !skeleton && (
          <ProfilePage profile={profile} username={username} />
        )}
      </main>
    </>
  )
}

export default User
