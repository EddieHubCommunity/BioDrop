import './Profile.css'

import React from 'react'
import PropTypes from 'prop-types'

import { Avatar } from 'primereact/avatar'
import { Skeleton } from 'primereact/skeleton'

import { Badge } from 'primereact/badge'
import ImageLoader from './ImageLoader'

function Profile({ profile, isLoading }) {
  const { name, bio, avatar, links } = profile
  return (
    <section>
      <div className="p-d-flex p-jc-center p-ai-center">
        <Avatar
          image={avatar}
          imageAlt={`Profile picture of ${name}`}
          size="xlarge"
          shape="circle"
          template={<ImageLoader avatar={avatar} username={name}/>}
          className="p-overlay-badge"
        >
          {!isLoading && <Badge value={links.length} severity="info" className="p-mr-2 p-mt-2" />}
        </Avatar>
        {!isLoading ? <h1 className="p-m-2">{name}</h1> : <Skeleton className="p-m-2" shape="rounded" height="30px" width="200px"/>}
      </div>
      <div className="p-d-flex p-jc-center w-50">
        {!isLoading ? <p>{bio}</p> : <Skeleton className="p-mt-4" width="300px" shape="rounded"/> }
      </div>
    </section>
  )
}

Profile.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(PropTypes.shape({
      icon: PropTypes.string,
      name: PropTypes.string,
      url: PropTypes.string,
    })),
  }),
  isLoading: PropTypes.bool.isRequired,
}

export default Profile
