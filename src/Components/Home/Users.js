import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Chip } from 'primereact/chip'
import { Avatar } from 'primereact/avatar'
import { Badge } from 'primereact/badge'
import { Message } from 'primereact/message'

import Navbar from '../Navbar'
import Searchbar from './Searchbar'
import ProfileTypeFilter from './filterProfileType'
import utils from '../../utils'

function Users({ list }) {
  const [profileType, setProfileType] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredList, setFilteredList] = useState(list)

  const typeHandler = (value) => {
    setProfileType(value)
    if (value === 'all') {
      return setFilteredList(
        list.filter((User) =>
          User.name
            .normalize('NFD')
            .toLowerCase()
            .includes(searchTerm.normalize('NFD').toLowerCase()),
        ),
      )
    }
    setFilteredList(
      list
        .filter((User) => (User.type ? User.type === value : false))
        .filter((User) =>
          User.name
            .normalize('NFD')
            .toLowerCase()
            .includes(searchTerm.normalize('NFD').toLowerCase()),
        ),
    )
  }

  const searchHandler = (value) => {
    setSearchTerm(value || '')
    setFilteredList(
      list
        .filter((User) =>
          User.name
            .normalize('NFD')
            .toLowerCase()
            .includes(value.normalize('NFD').toLowerCase()),
        )
        .filter((User) => {
          if (profileType === 'all') return true
          return User.type ? User.type === profileType : false
        }),
    )
  }

  return (
    <>
      <Navbar
        start={
          <Searchbar searchTerm={searchTerm} searchHandler={searchHandler} />
        }
      />
      <div className="mb-2 flex justify-content-center align-items-center">
        <label className="p-2">Profile Type</label>
        <ProfileTypeFilter
          profileType={profileType}
          typeHandler={typeHandler}
        />
      </div>
      <div className="user-list flex flex-wrap justify-content-center">
        {!!filteredList &&
          filteredList.length > 0 &&
          filteredList.map((user, key) => (
            <Link to={user.username} key={`avatar-${key}`}>
              <Chip
                className="m-2 w-16rem px-3 py-2 transition-all transition-duration-300"
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
                    <span className="text-overflow-ellipsis white-space-nowrap overflow-hidden">
                      {user.name}
                    </span>
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
