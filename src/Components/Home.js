import './Home.css'

import React, { useState, useEffect } from 'react'
import { ProgressBar } from 'primereact/progressbar'
import { Avatar } from 'primereact/avatar'
import { Skeleton } from 'primereact/skeleton'

function Home() {
  const [showProgress, setShowProgress] = useState(true)
  const [list, setList] = useState([])
  const [skeleton, setskeleton] = useState(true)

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
      {skeleton
        ? <div>
        <div style={{ display: 'none' }}>
      {setTimeout(() => {
        setskeleton(false)
      }, 3000)}
      </div>
      <div className="p-d-flex p-flex-wrap">
          {list.map((user, index) => { return <Skeleton shape="circle" size="65px" className="p-mr-2 p-m-2" key={index} /> })}
      </div>
      </div>
        : <>
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
      </>
      }
    </main>
  )
}

export default Home
