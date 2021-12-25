import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Chip } from 'primereact/chip'
import { Avatar } from 'primereact/avatar'
import { Badge } from 'primereact/badge'
import { Message } from 'primereact/message'

import Navbar from '../Navbar'
import Searchbar from './Searchbar'
import utils from '../../utils'

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
      <div className="user-list flex flex-wrap justify-content-center">
        {!!filteredList &&
          filteredList.length > 0 &&
          filteredList.map((user, key) => (
            <Link to={user.username} key={`avatar-${key}`}>
              <Chip
                className="m-2"
                template={
                  <>
                    <Avatar
                      image={user.avatar}
                      size="large"
                      className="p-overlay-badge"
                      onImageError={(error) => {
                        utils.setDefaultSVG(user.name, error)
                      }}
                    >
                      <Badge
                        value={user.linkCount > 9 ? '9+' : user.linkCount}
                        severity="info"
                        className="mr-3"
                      ></Badge>
                    </Avatar>
                    <span className="p-chip-text">{user.name}</span>
                  </>
                }
              />
            </Link>
          ))}
        {!!filteredList && filteredList.length === 0 && (
          <div className="flex justify-content-center align-items-center">
            <Message
              severity="error"
              text="No users found, please try with another name."
            />
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
