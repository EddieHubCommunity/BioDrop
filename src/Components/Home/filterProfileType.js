import React from 'react'
import PropTypes from 'prop-types'

export default function ProfileTypeFilter({ profileType, typeHandler }) {
  return (
    <div className="flex flex-column justify-content-center">
      <div className="m-3 flex">
        <select
          value={profileType}
          onChange={(e) => typeHandler(e.target.value)}
        >
          <option value="personal">Personal</option>
          <option value="misc">Misc</option>
          <option value="community">Community</option>
        </select>
      </div>
    </div>
  )
}

ProfileTypeFilter.propTypes = {
  profileType: PropTypes.string.isRequired,
  typeHandler: PropTypes.func.isRequired,
}
