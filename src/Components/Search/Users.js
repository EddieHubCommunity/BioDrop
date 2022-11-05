import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Chip } from 'primereact/chip'
import { Message } from 'primereact/message'
import { useTheme } from '../../ThemeContext'
import Searchbar from './Searchbar'
import ProfileTypeFilter from './filterProfileType'

function Users({ list }) {
  const [profileType, setProfileType] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredList, setFilteredList] = useState(list)
  const [length, setlength] = useState(0)
  const darkTheme = useTheme()

  const theme = {
    backgroundColor: `${darkTheme ? '#333333' : '#dee2e6'}`,
    color: `${darkTheme ? 'white' : 'grey'}`,
  }

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
    setlength(value.length)
    setSearchTerm(value)
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
      <div className="mb-2 flex justify-content-center align-items-center">
        <Searchbar searchTerm={searchTerm} searchHandler={searchHandler} />
        <label className="p-2">Profile Type</label>
        <ProfileTypeFilter
          profileType={profileType}
          typeHandler={typeHandler}
        />
      </div>
      {length >= 3 && <div className="user-list flex flex-wrap justify-content-center">
        {!!filteredList &&
          filteredList.length > 0 &&
          filteredList.map((user, key) => (
            <Link to={user.username} key={`avatar-${key}`}>
              <Chip
                style={theme}
                label={
                  user.name.length > 20
                    ? user.name.slice(-22) + ' ...'
                    : user.name
                }
                className="m-2 w-16rem px-3 py-2 transition-all transition-duration-300"
               image={user.avatar}
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
      </div>}
    </>
  )
}

Users.propTypes = {
  list: PropTypes.array.isRequired,
}

export default Users
