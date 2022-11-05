import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '../../ThemeContext'
import { Dropdown } from 'primereact/dropdown'

export default function ProfileTypeFilter({ profileType, typeHandler }) {
  const darkTheme = useTheme()
  const profileTypes = [
    { label: 'Personal', value: 'personal' },
    { label: 'All', value: 'all' },
    { label: 'Community', value: 'community' },
  ]

  const theme = {
    backgroundColor: `${darkTheme ? '#333333' : 'white'}`,
    border: `${darkTheme ? 'none' : '1px solid #ced4da'}`,
    color: `${darkTheme ? 'white' : '#f3f3f3'}`,
    flexGrow: 1,
  }

  return (
    <Dropdown
      value={profileType}
      options={profileTypes}
      onChange={(e) => typeHandler(e.value)}
      style={theme}
      ariaLabelledBy={profileType}
      ariaLabel={profileType}
    />
  )
}

ProfileTypeFilter.propTypes = {
  profileType: PropTypes.string.isRequired,
  typeHandler: PropTypes.func.isRequired,
}
