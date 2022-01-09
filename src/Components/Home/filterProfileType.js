import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown } from 'primereact/dropdown'

export default function ProfileTypeFilter({ profileType, typeHandler }) {
  const profileTypes = [
    { label: 'Personal', value: 'personal' },
    { label: 'All', value: 'all' },
    { label: 'Community', value: 'community' },
  ]

  return (
    <Dropdown
      value={profileType}
      options={profileTypes}
      onChange={(e) => typeHandler(e.value)}
    />
  )
}

ProfileTypeFilter.propTypes = {
  profileType: PropTypes.string.isRequired,
  typeHandler: PropTypes.func.isRequired,
}
