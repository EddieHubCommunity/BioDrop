import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Chip } from 'primereact/chip'
import { Avatar } from 'primereact/avatar'
import { Badge } from 'primereact/badge'
import utils from '../../utils'

function UserChip({ user, ...props }) {
  return (
    <Link
      to={user.username}
      {...(props.lastElementRef && { ref: props.lastElementRef })}
    >
      <Chip
        className="m-2 w-16rem px-3 py-2 transition-all transition-duration-300"
        template={
          <>
            <Avatar
              image={user.avatar}
              size="large"
              className="p-overlay-badge"
              onImageError={(error) => {
                utils.setDefaultSVG(user.name, error)
              }}
            >
              <Badge
                value={user.linkCount > 9 ? '9+' : user.linkCount}
                severity="info"
                className="mr-3"
              ></Badge>
            </Avatar>
            <span className="text-overflow-ellipsis white-space-nowrap overflow-hidden">
              {user.name}
            </span>
          </>
        }
      />
    </Link>
  )
}

UserChip.propTypes = {
  user: PropTypes.object.isRequired,
  lastElementRef: PropTypes.func,
}

export default UserChip
