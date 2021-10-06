import './Profile.css'

import React from 'react'
import PropTypes from 'prop-types'

import { Avatar } from 'primereact/avatar'
import { Badge } from 'primereact/badge'

function Profile({ name, bio, avatar, total, config }) {
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
          {config && (
            <Badge
              value={total}
              severity={`${config.badgeSeverity}`}
              className="p-mr-2 p-mt-2"
            />
          )}
          {!config && (
            <Badge value={total} severity="info" className="p-mr-2 p-mt-2" />
          )}
        </Avatar>
        <h1 className="p-m-2">{name}</h1>
      </div>
      {config && (
        <div
          className="p-d-flex p-jc-center w-50"
          style={{
            color: config.fontColor,
            backgroundColor: config.background,
          }}
        >
          <p>{bio}</p>
        </div>
      )}
      {!config && (
        <div className="p-d-flex p-jc-center w-50">
          <p>{bio}</p>
        </div>
      )}
    </section>
  )
}

Profile.propTypes = {
  name: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  config: PropTypes.object,
}

export default Profile
