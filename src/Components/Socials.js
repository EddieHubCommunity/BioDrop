import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Skeleton } from 'primereact/skeleton'

import Profile from './Profile'
import Links from './Links'
import Milestones from './Milestones'

function Socials() {
  const [showProgress, setShowProgress] = useState(true)
  const { username } = useParams()
  const [profile, setProfile] = useState({})

  useEffect(() => {
    fetch(`/data/${username}.json`)
      .then((response) => response.json())
      .then((data) => setProfile(data))
      .catch((error) => {
        console.log('Socials useEffect', error)
        alert('An error occurred please try again later.')
      })
      .finally(() => setShowProgress(false))
  }, [username])

  return (
    <main>
        <>
          <Link to="/"><i className="pi pi-arrow-left"></i></Link>
          <Profile
            isLoading={showProgress}
            profile={profile}
          />
          {profile.links && !showProgress
            ? <Links links={profile.links} />
            : <div className="p-d-flex p-jc-center p-mt-4 p-mb-4"><Skeleton shape="rounded" height="50px" width="45rem"/></div>}
        </>
      {profile.milestones && <Milestones milestones={profile.milestones} />}
    </main>
  )
}

export default Socials
