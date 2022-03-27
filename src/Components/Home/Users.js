import React, { useState, useRef, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Message } from 'primereact/message'

import Navbar from '../Navbar'
import Searchbar from './Searchbar'
import ProfileTypeFilter from './filterProfileType'
import UserChip from './UserChip'

const getLimitForScreenSize = (viewPortWidth) => {
  if (viewPortWidth > 1410) return 50
  if (viewPortWidth > 1130 && viewPortWidth < 1410) return 40
  if (viewPortWidth > 860 && viewPortWidth < 1130) return 30
  if (viewPortWidth > 560 && viewPortWidth < 860) return 20
  if (viewPortWidth < 560) return 10
}
function Users({ list }) {
  const [profileType, setProfileType] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [lastIndex, setLastIndex] = useState(0)
  const limit = useMemo(
    () => getLimitForScreenSize(window.visualViewport.width),
    [window.visualViewport.width],
  )

  let filteredList = list

  filteredList =
    profileType !== 'all'
      ? list.filter((User) => (User.type ? User.type === profileType : false))
      : list

  filteredList = searchTerm
    ? filteredList.filter((User) =>
      User.name
        .normalize('NFD')
        .toLowerCase()
        .includes(searchTerm.normalize('NFD').toLowerCase()),
    )
    : filteredList

  const listForRender = filteredList.slice(0, lastIndex + limit)
  const hasMore = listForRender.length < filteredList.length

  const loadMore = () => {
    setLastIndex((prevIndex) => prevIndex + limit)
  }

  const observer = useRef(null)
  const lastElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) loadMore()
      })
      if (node) observer.current.observe(node)
    },
    [hasMore, loadMore],
  )

  return (
    <>
      <Navbar
        start={
          <Searchbar searchTerm={searchTerm} searchHandler={setSearchTerm} />
        }
      />
      <div className="mb-2 flex justify-content-center align-items-center">
        <label className="p-2">Profile Type</label>
        <ProfileTypeFilter
          profileType={profileType}
          typeHandler={setProfileType}
        />
      </div>
      <div className="user-list flex flex-wrap justify-content-center">
        {!!listForRender &&
          listForRender.length > 0 &&
          listForRender.map((user, index) => {
            if (listForRender.length === index + 1 && !searchTerm) {
              return (
                <UserChip
                  key={index}
                  user={user}
                  lastElementRef={lastElementRef}
                />
              )
            }
            return <UserChip key={index} user={user} />
          })}
        {!!listForRender && listForRender.length === 0 && (
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
