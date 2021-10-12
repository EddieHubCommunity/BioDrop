import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Chip } from 'primereact/chip'
import { InputText } from 'primereact/inputtext'
import linkfree from '../res/images/linkfree.png'
import './Users.css'

function User({ list }) {
  const [searchTerm, setSearchTerm] = useState('')
  return (
    <>
      <div className="logo-img">
        <img src={linkfree} alt="Link Free" width="10%" height="8%"></img>
      </div>
      <div className="search-section">
        <InputText
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
        />
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
