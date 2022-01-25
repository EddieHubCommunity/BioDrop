import React from 'react'

import PropTypes from 'prop-types'
import 'primereact/button/button.min.css'

function StyledLink({ children, className = '', ...props }) {
  const classNames = ['p-button p-component', className].join(' ')
  return (
    <a className={classNames} {...props}>
      {children}
    </a>
  )
}

StyledLink.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default StyledLink
