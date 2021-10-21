import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Chip } from 'primereact/chip'
import { InputText } from 'primereact/inputtext'
import { Message } from 'primereact/message'

function User({ list }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredList, setFilteredList] = useState(list)
  return (
    <>
      <label htmlFor="search-input">Search for User</label>
      <div className="search-section">
        <InputText
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setFilteredList(
              list.filter((User) =>
                User.name.toLowerCase().includes(searchTerm.toLowerCase()),
              ),
            )
          }}
          placeholder="Search..."
        />
      </div>
      {!!filteredList && filteredList.length > 0
        ? (
            filteredList.map((user, key) => (
              <a href={`${user.username}`} key={`avatar-${key}`}>
                <Chip image={user.avatar} className="p-m-2" label={user.name} />
              </a>
            ))
          )
        : (
            <div className="p-d-flex p-jc-center p-ai-center">
              <Message severity="error" text="No users found for this selection." />
            </div>
          )
      }
    </>
  )
}

User.propTypes = {
  list: PropTypes.array.isRequired,
}

export default User
