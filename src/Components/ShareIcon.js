import React from 'react'
import GetIcons from './Icons/GetIcons'
import PropTypes from 'prop-types'

function ShareIcon({ link, label, iconName }) {
  return (
    <a
      className="mx-5"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
    >
      <GetIcons
        style={{ color: '#333' }}
        className="w-2rem h-2rem my-2rem cursor-pointer"
        iconName={iconName}
        size={20}
      />
    </a>
  )
}

export default ShareIcon

ShareIcon.propTypes = {
  link: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
}
