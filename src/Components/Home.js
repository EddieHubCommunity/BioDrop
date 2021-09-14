import { Avatar } from 'primereact/avatar'
import React, { useState, useEffect } from 'react'

import { useHistory } from 'react-router-dom'

function Home() {
  const history = useHistory()
  const [list, setList] = useState([
    {
      name: '404',
      avatar:
        'https://user-images.githubusercontent.com/624760/114314271-ea156a80-9af1-11eb-97ca-977be7565aa6.png',
    },
  ])

  const goToLinkHandle = (url) => {
    history.push(url)
  }

  useEffect(() => {
    fetch('/data/_list.json')
      .then((response) => response.json())
      .then((data) => setList(data))
  }, [])

  return (
    <div>
      {list.map((user, key) => (
        <Avatar
          image={user.avatar}
          key={key}
          shape="circle"
          size="xlarge"
          onClick={() => goToLinkHandle(user.username)}
        />
      ))}
    </div>
  )
}

export default Home
