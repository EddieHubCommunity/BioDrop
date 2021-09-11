import React from 'react'
import PropTypes from 'prop-types'

import { Avatar } from 'primereact/avatar'
import { Badge } from 'primereact/badge'

function Profile({ name, bio, avatar, total }) {
  return (
    <div>
      <div className="p-d-flex p-jc-center p-ai-center">
        <Avatar
          image={avatar}
          size="xlarge"
          shape="circle"
          className="p-overlay-badge"
        >
          <Badge value={total} severity="info" />
        </Avatar>
        <h1 className="p-m-2">{name}</h1>
      </div>
      <div className="p-d-flex p-jc-center">
        <p>{bio}</p>
      </div>
    </div>
  )
}

Profile.propTypes = {
  name: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  total: PropTypes.string.number,
}

export default Profile
