import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Chip } from 'primereact/chip'
import { InputText } from 'primereact/inputtext'

function User({ list }) {
  const [searchTerm, setSearchTerm] = useState('')
  return (
    <>
      <label htmlFor="search-input">Search for User</label>
      <div className="search-section">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={searchTerm}
            onChange={({ target }) => setSearchTerm(target.value)}
            name="user"
            id="search-input"
            placeholder="Search..."
          />
        </span>
      </div>
      {list
        .filter((User) =>
          User.name.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        .map((user, key) => (
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
