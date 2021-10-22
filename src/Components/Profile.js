import './Profile.css'

import React from 'react'
import PropTypes from 'prop-types'

import { Avatar } from 'primereact/avatar'
import { Badge } from 'primereact/badge'

function Profile({ name, bio, avatar, total, username }) {
  return (
    <section>
      <div className="p-d-flex p-jc-center p-ai-center">
        <Avatar
          image={avatar}
          imageAlt={`Profile picture of ${name}`}
          size="xlarge"
          shape="circle"
          className="p-overlay-badge"
        >
          <Badge value={total} severity="info" className="p-mr-2 p-mt-2" />
        </Avatar>
        <h1 className="p-m-2">{name}</h1>
        <h4 className="">({username})</h4>
      </div>
      <div className="p-d-flex p-jc-center w-50">
        <p>{bio}</p>
      </div>
    </section>
  )
}

Profile.propTypes = {
  name: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
}

export default Profile
