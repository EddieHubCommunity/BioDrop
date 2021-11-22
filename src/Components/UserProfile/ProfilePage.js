import React from 'react'
import PropTypes from 'prop-types'

import Profile from '../Profile'
import Links from '../Links'
import Milestones from '../Milestones'

function ProfilePage({ profile, username }) {
  return (
    <>
      {
        <>
          <Profile profile={profile} username={username} />
          <Links links={profile.links} />
        </>
      }
      {profile.milestones && <Milestones milestones={profile.milestones} />}
    </>
  )
}

ProfilePage.propTypes = {
  username: PropTypes.string.isRequired,
  profile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.string,
        name: PropTypes.string,
        url: PropTypes.string,
      }),
    ),
    milestones: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        image: PropTypes.string,
        date: PropTypes.string,
        icon: PropTypes.string,
        color: PropTypes.string,
        description: PropTypes.string,
        url: PropTypes.string,
      }),
    ),
  }),
}

export default ProfilePage
