import './Home.css'

import React, { useState, useEffect } from 'react'
import { ProgressBar } from 'primereact/progressbar'

import { Avatar } from 'primereact/avatar'

function Home() {
  const [list, setList] = useState([
    {
      username: '404',
      avatar:
        'https://github.com/EddieHubCommunity.png',
    },
  ])
  const [showProgress, setShowProgress] = useState(true)

  useEffect(() => {
    fetch('/list.json')
      .then((response) => response.json())
      .then((data) => setList(data))
      .catch((error) => {
        console.log('Home useEffect', error)
        alert('An error occurred please try again later.')
      })
      .finally(() => setShowProgress(false))
  }, [])

  return (
    <main>
      {list.map((user, key) => (
        <a href={`${user.username}`} key={`avatar-${key}`}>
          <Avatar
            image={user.avatar}
            shape="circle"
            size="xlarge"
            className="p-m-2"
            imageAlt={user.username}
          />
        </a>
      ))}
      {showProgress && <ProgressBar mode="indeterminate" />}
    </main>
  )
}

export default Home
