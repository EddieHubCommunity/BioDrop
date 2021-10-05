import React from 'react'
import PropTypes from 'prop-types'

import { Skeleton } from 'primereact/skeleton'

function Placeholder({ list }) {
  return (
    <div className="p-d-flex p-flex-wrap">
      {list.map((user, key) => {
        return (
          <Skeleton
            shape="circle"
            size="65px"
            className="p-mr-2 p-m-2"
            key={`skeleton-${key}`}
          />
        )
      })}
    </div>
  )
}

Placeholder.propTypes = {
  list: PropTypes.array.isRequired,
}

export default Placeholder
