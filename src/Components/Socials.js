import React, { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'

import Profile from './Profile'
import Links from './Links'
import Milestones from './Milestones'

function Socials() {
  const { username } = useParams()
  const [profile, setProfile] = useState({
    name: '404',
    bio: '-',
    avatar:
      'https://user-images.githubusercontent.com/624760/114314271-ea156a80-9af1-11eb-97ca-977be7565aa6.png',
    links: [],
  })

  useEffect(() => {
    fetch(`/data/${username}.json`)
      .then((response) => response.json())
      .then((data) => setProfile(data))
      .catch((error) => {
        console.log('Socials useEffect', error)
        alert('An error occurred please try again later.')
      })
  }, [username])

  return (
    <main>
      <Profile
        bio={profile.bio}
        avatar={profile.avatar}
        name={profile.name}
        total={profile.links.length}
      />
      <Links links={profile.links} />
      {profile.milestones && <Milestones milestones={profile.milestones} />}
    </main>
  )
}

export default Socials
