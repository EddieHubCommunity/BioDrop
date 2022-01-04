import React from 'react'
import GetIcons from './Icons/GetIcons'
import PropTypes from 'prop-types'
import './ShareProfile.css'
import ShareIcon from './ShareIcon'

export default function ShareProfile({ username }) {
  const CopyLink = () => {
    navigator.clipboard.writeText(`http://linkfree.eddiehub.org/${username}`)
    alert('Link copied to clipboard.')
  }

  return (
    <div className="flex justify-content-center">
      <ShareIcon
        link={`https://www.facebook.com/sharer/sharer.php?u=https://linkfree.eddiehub.org/${username}`}
        label="Share on Facebook"
        iconName="facebook"
      />
      <ShareIcon
        link={`https://twitter.com/intent/tweet?text=Check out my LinkFree profile! https://linkfree.eddiehub.org/${username}`}
        label="Share on Twitter"
        iconName="twitter"
      />

      <ShareIcon
        link={`https://www.linkedin.com/sharing/share-offsite?url=https%3A%2F%2Flinkfree.eddiehub.org%2F${username}`}
        label="Share on LinkedIn"
        iconName="linkedin"
      />

      <a role="button" onClick={CopyLink} aria-label="Copy link to profile">
        <GetIcons className="profile__icon" iconName="link" size={20} />
      </a>
    </div>
  )
}

ShareProfile.propTypes = {
  username: PropTypes.string.isRequired,
}
