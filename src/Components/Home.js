import './Home.css'

import React, { useEffect, useState } from 'react'
import { Avatar } from 'primereact/avatar'
import { ProgressBar } from 'primereact/progressbar'

function Home() {
  const [showProgress, setShowProgress] = useState(true)
  const [list, setList] = useState([])

  useEffect(() => {
    fetch('/list.json')
      .then((response) => response.json())
      .then((data) => data.sort((a, b) => a.username.localeCompare(b.username)))
      .then((data) => setList(data))
      .catch((error) => {
        console.log('Home useEffect', error)
        alert('An error occurred please try again later.')
      })
      .finally(() => setShowProgress(false))
  }, [])

  return (
    <main>
      {showProgress && <ProgressBar mode="indeterminate" />}
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
    </main>
  )
}

export default Home
