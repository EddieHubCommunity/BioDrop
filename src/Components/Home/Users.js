import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Chip } from 'primereact/chip'

import { Message } from 'primereact/message'

import Navbar from '../Navbar'
import Searchbar from './Searchbar'

function Users({ list }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredList, setFilteredList] = useState(list)

  const searchHandler = (value) => {
    setSearchTerm(value || '')
    setFilteredList(
      list.filter((User) =>
        User.name
          .normalize('NFD')
          .toLowerCase()
          .includes(value.normalize('NFD').toLowerCase()),
      ),
    )
  }

  return (
    <>
      <Navbar
        start={
          <Searchbar searchTerm={searchTerm} searchHandler={searchHandler} />
        }
      />
      <div className="user-list p-d-flex p-flex-wrap p-jc-center">
        {!!filteredList &&
          filteredList.length > 0 &&
          filteredList.map((user, key) => (
            <Link to={user.username} key={`avatar-${key}`}>
              <Chip image={user.avatar} className="p-m-2" label={user.name} />
            </Link>
          ))}
        {!!filteredList && filteredList.length === 0 && (
          <div className="p-d-flex p-jc-center p-ai-center">
            <Message severity="error" text="No users found please try again" />
          </div>
        )}
      </div>
    </>
  )
}

Users.propTypes = {
  list: PropTypes.array.isRequired,
}

export default Users
