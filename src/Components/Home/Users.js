import React from 'react'
import PropTypes from 'prop-types'
import { Chip } from 'primereact/chip'

function User({ list }) {
  return (
    <>
      {list.map((user, key) => (
        <a href={`${user.username}`} key={`avatar-${key}`}>
          <Chip
            image={user.avatar}
            className="p-m-2"
            label={user.username}
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
