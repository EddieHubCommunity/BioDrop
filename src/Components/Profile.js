import './Profile.css'

import React from 'react'
import PropTypes from 'prop-types'

import { Avatar } from 'primereact/avatar'

import utils from '../utils'

function Profile({ profile, username }) {
  const { name, bio, avatar } = profile
  return (
    <section>
      <div className="p-d-flex p-jc-center p-ai-center">
        <Avatar
          image={avatar}
          imageAlt={`Profile picture of ${name}`}
          size="xlarge"
          shape="circle"
          onImageError={(error) => {
            utils.setDefaultSVG(name, error)
          }}
        />
        <div className="p-d-flex p-flex-column p-flex-sm-row p-jc-center p-ai-center">
          <h1 className="p-m-2">{name}</h1>
          <h4 className="p-my-0">({username})</h4>
        </div>
      </div>
      <div className="p-d-flex p-jc-center w-50">
        <p>{bio}</p>
      </div>
    </section>
  )
}

Profile.propTypes = {
  username: PropTypes.string.isRequired,
  profile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }),
}

export default Profile
