import './Home.css'

import React, { useState, useEffect } from 'react'
import { ProgressBar } from 'primereact/progressbar'
import { Avatar } from 'primereact/avatar'
import { Skeleton } from 'primereact/skeleton'

function Home() {
  const [showProgress, setShowProgress] = useState(true)
  const [list, setList] = useState([])
  const [profile, setprofile] = useState({
    user: [],
  })

  const data = []

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

  //  Get Avatar
  useEffect(() => {
    list.forEach((user) => {
      const splitId = user.avatar.split('/')
      const userID = splitId[3].split('.')
      const githubID = userID[0]
      const url = 'https://avatars.githubusercontent.com/' + githubID
      fetch(url)
        .then(response => response.blob())
        .then(imageBlob => {
          const imageObjectURL = URL.createObjectURL(imageBlob)
          const obj = {
            avatar: imageObjectURL,
            username: githubID,
          }
          data.push(obj)
          setprofile({
            user: data,
          })
        })
    })
  }, [list])

  return (
    <main>
      {showProgress && <ProgressBar mode="indeterminate" />}
      {profile.user.length !== list.length
        ? <div className="p-d-flex p-flex-wrap">
          {list.map((user, index) => { return <Skeleton shape="circle" size="65px" className="p-mr-2 p-m-2" key={index} /> })}
        </div>
        : <>
        {profile.user.map((user, key) => (
          <a href={`${user.username}`} key={`avatar-${key}`}>
            <Avatar
              image={user.avatar}
              shape="circle"
              size="xlarge"
              className="p-m-2"
              imageAlt={user.username}
            />
          </a>
        ))
        }
        </>
      }
    </main>
  )
}

export default Home
