import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ProgressBar } from 'primereact/progressbar'
import PropTypes from 'prop-types'

import ProfilePage from './ProfilePage'
import Placeholder from './Placeholder'
import ErrorPage from './ErrorPage'
import Navbar from '../Navbar'
import GetIcons from '../Icons/GetIcons'

function User({ singleUser }) {
  const [showProgress, setShowProgress] = useState(true)
  const [skeleton, setskeleton] = useState(true)
  const [profile, setProfile] = useState()
  const [error, setError] = useState(false)
  const { username } = singleUser || useParams()

  useEffect(() => {
    fetch(`/data/${username}.json`)
      .then((response) => response.json())
      .then((data) => {
        setProfile(data)
        document.title = `${data.name} | LinkFree`
      })
      .catch(() => setError(true))
      .finally(() => {
        setShowProgress(false)
        setTimeout(() => setskeleton(false), 500)
      })
    return () => {
      document.title = 'LinkFree'
    }
  }, [username])

  return (
    <>
      {!singleUser && (
        <header>
          <Navbar
            start={
              <Link to="/search" aria-label="Go back to Search">
                <GetIcons iconName="arrowLeft" size={20} />
              </Link>
            }
          />
        </header>
      )}
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

User.propTypes = {
  singleUser: PropTypes.object,
}

export default User
