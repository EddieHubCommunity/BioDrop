import './Home.css'

import React, { useState, useEffect } from 'react'
import { ProgressBar } from 'primereact/progressbar'
import { Avatar } from 'primereact/avatar'

function Home() {
  const [showProgress, setShowProgress] = useState(true)
  const [list, setList] = useState([])

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
      {showProgress && <ProgressBar mode="indeterminate" />}
      <div className="p-d-flex p-flex-wrap">
        {list.map((user, key) => (
          <a href={`${user.username}`} key={`avatar-${key}`}>
            <Avatar
              image={`${user.avatar}?size=65`}
              shape="circle"
              size="xlarge"
              className="p-m-2"
              imageAlt={user.username}
            />
          </a>
        ))}
      </div>
    </main>
  )
}

export default Home
