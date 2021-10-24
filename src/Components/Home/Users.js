import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Chip } from 'primereact/chip'
import { InputText } from 'primereact/inputtext'
import { Link } from 'react-router-dom'

function User({ list }) {
  const [searchTerm, setSearchTerm] = useState('')
  return (
    <>
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
          <Link to={`${user.username}`} key={`avatar-${key}`}>
            <Chip image={user.avatar} className="p-m-2" label={user.name} />
          </Link>
        ))}
    </>
  )
}

User.propTypes = {
  list: PropTypes.array.isRequired,
}

export default User
