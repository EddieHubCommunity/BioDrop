import React from 'react'
import PropTypes from 'prop-types'
import { Avatar } from 'primereact/avatar'

function User({ list }) {
  return (
    <>
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
  )
}

User.propTypes = {
  list: PropTypes.array.isRequired,
}

export default User
