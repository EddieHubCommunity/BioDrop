import React from 'react'
import PropTypes from 'prop-types'

import { Skeleton } from 'primereact/skeleton'

function Placeholder({ list }) {
  return (
    <>
      <Skeleton shape="rectangle" height="3.2rem" className="mb-4" />
      <div className="flex flex-wrap justify-content-center">
        {list.map((user, key) => {
          return (
            <Skeleton
              width="16rem"
              height="4rem"
              borderRadius="2rem"
              className="m-2 mr-2"
              key={`skeleton-${key}`}
            />
          )
        })}
      </div>
    </>
  )
}

Placeholder.propTypes = {
  list: PropTypes.array.isRequired,
}

export default Placeholder
