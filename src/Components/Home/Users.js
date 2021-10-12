import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Chip } from 'primereact/chip'
import { InputText } from 'primereact/inputtext'

function User({ list }) {
  const [searchTerm, setSearchTerm] = useState('')
  const history = useHistory()

  return (
    <>
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
          <span
            key={`avatar-${key}`}
            onClick={() => history.push(`${user.username}`)}
          >
            <Chip image={user.avatar} className="p-m-2" label={user.name} />
          </span>
        ))}
    </>
  )
}

User.propTypes = {
  list: PropTypes.array.isRequired,
}

export default User
