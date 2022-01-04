import React from 'react'
import GetIcons from './Icons/GetIcons'
import PropTypes from 'prop-types'
import './ShareProfile.css'

export default function ShareProfile({ username }) {
  const CopyLink = () => {
    navigator.clipboard.writeText(`http://linkfree.eddiehub.org/${username}`)
    alert('Link copied to clipboard.')
  }

  return (
    <div className="profile__container">
      <a
        className="profile__iconLinks"
        href={`https://www.facebook.com/sharer/sharer.php?u=https://linkfree.eddiehub.org/profile/${username}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
      >
        <GetIcons className="profile__icon" iconName="facebook" size={20} />
      </a>
      <a
        className="profile__iconLinks"
        href={`https://twitter.com/intent/tweet?text=Check out my LinkFree profile! https://linkfree.eddiehub.org/profile/${username}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Twitter"
      >
        <GetIcons className="profile__icon" iconName="twitter" size={20} />
      </a>
      <a
        className="profile__iconLinks"
        href={`https://www.linkedin.com/sharing/share-offsite?url=https%3A%2F%2Flinkfree.eddiehub.org%2F${username}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
      >
        <GetIcons className="profile__icon" iconName="linkedin" size={20} />
      </a>

      <a role="button" onClick={CopyLink} aria-label="Copy link to profile">
        <GetIcons className="profile__icon" iconName="link" size={20} />
      </a>
    </div>
  )
}

ShareProfile.propTypes = {
  username: PropTypes.string.isRequired,
}
