import './Home.css'

import React, { useState, useEffect } from 'react'
import { ProgressBar } from 'primereact/progressbar'
import { Avatar } from 'primereact/avatar'

function Home() {
  const [showProgress, setShowProgress] = useState(true)
  const [list, setList] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/list.json')
        const data = await response.json()
        setList(data)
        setShowProgress(false)
      } catch (error) {
        console.log('Home useEffect', error)
        alert('An error occurred please try again later.')
      }
    }
    fetchData()
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
