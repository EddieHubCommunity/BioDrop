import React, { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'

import Profile from './Profile'
import Links from './Links'

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
    </main>
  )
}

export default Socials
