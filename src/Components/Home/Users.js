import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Chip } from 'primereact/chip'
import { InputText } from 'primereact/inputtext'
import { Message } from 'primereact/message'

function User({ list }) {
  const [searchTerm, setSearchTerm] = useState('')
  return (
    <>
      <div className="search-section">
        <InputText
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
        />
      </div>
      {(() => {
        if (
          list.filter((User) =>
            User.name.toLowerCase().includes(searchTerm.toLowerCase()),
          ).length > 0
        ) {
          return list
            .filter((User) =>
              User.name.toLowerCase().includes(searchTerm.toLowerCase()),
            )
            .map((user, key) => (
              <a href={`${user.username}`} key={`avatar-${key}`}>
                <Chip image={user.avatar} className="p-m-2" label={user.name} />
              </a>
            ))
        } else {
          return (
            <div className="p-d-flex p-jc-center p-ai-center">
              <Message
                severity="error"
                text="No user found."
              />
            </div>
          )
        }
      })()}
      {/* {list
        .filter((User) =>
          User.name.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        .map((user, key) => (
          <a href={`${user.username}`} key={`avatar-${key}`}>
            <Chip image={user.avatar} className="p-m-2" label={user.name} />
          </a>
        ))} */}
    </>
  )
}

User.propTypes = {
  list: PropTypes.array.isRequired,
}

export default User
