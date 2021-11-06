import React from 'react'
import PropTypes from 'prop-types'

import { Skeleton } from 'primereact/skeleton'

function Placeholder({ list }) {
  return (
    <>
    <Skeleton
      shape="rectangle"
      height="3.2rem"
      className="p-mb-4"
    />
    <div className="p-d-flex p-flex-wrap p-jc-center">
      {list.map((user, key) => {
        return (
          <Skeleton
            width="16rem"
            height="2.6rem"
            borderRadius="2rem"
            className="p-m-2 p-mr-2"
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
