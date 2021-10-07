import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Chip } from 'primereact/chip'

function User({ list }) {
  const [searchTerm, setsearchTerm] = useState('')
  return (
    <>
    <input className="searchBar" type="text" placeholder="Search..." onChange={event => { setsearchTerm(event.target.value) }} />
      {list.filter(User => User.name.toLowerCase().includes(searchTerm.toLowerCase())).map((user, key) => (
        <a href={`${user.username}`} key={`avatar-${key}`}>
          <Chip image={user.avatar} className="p-m-2" label={user.name} />
        </a>
      ))}
    </>
  )
}

User.propTypes = {
  list: PropTypes.array.isRequired,
}

export default User
