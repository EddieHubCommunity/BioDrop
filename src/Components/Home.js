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

  const addSkeleton = () => {
    setTimeout(() => {
      setskeleton(false)
    }, 300)
    return (
    <div className="p-d-flex p-flex-wrap">
        {list.map((user, index) => { return <Skeleton shape="circle" size="65px" className="p-mr-2 p-m-2" key={index} /> })}
    </div>
    )
  }

  return (
    <main>
      {showProgress && <ProgressBar mode="indeterminate" />}
      {skeleton
        ? <div className="skeleton">
      {addSkeleton()}
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
