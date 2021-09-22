import React, { useState, useEffect } from 'react'

import { Avatar } from 'primereact/avatar'

function Home() {
  const [list, setList] = useState([
    {
      username: '404',
      avatar:
        'https://github.com/EddieHubCommunity.png',
    },
  ])

  useEffect(() => {
    fetch('/list.json')
      .then((response) => response.json())
      .then((data) => setList(data))
  }, [])

  return (
    <main className="align-center">
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
