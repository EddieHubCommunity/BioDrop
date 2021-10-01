import './Home.css'

import React, { useState, useEffect } from 'react'

import { ProgressBar } from 'primereact/progressbar'
import { Avatar } from 'primereact/avatar'
import ReactTooltip from 'react-tooltip'

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
      {list.map((user, key) => (
        <a href={`${user.username}`} key={`avatar-${key}`} >
          <div className = "avatar-photo" data-tip={user.username} data-for="toolTip1" data-place = "bottom">
            <Avatar
              image={user.avatar}
              shape="circle"
              size="xlarge"
              className="p-m-2 p-avatar"
              imageAlt={user.username}
            />
          </div>
          <ReactTooltip className= "reactTooltip" id="toolTip1" />
        </a>
      ))}
    </main>
  )
}

export default Home
