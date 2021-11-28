import React from 'react'

import { Skeleton } from 'primereact/skeleton'
import { useUsers } from '../../Store/Context'

function Placeholder() {
  const list = useUsers()

  return (
    <>
      <Skeleton shape="rectangle" height="3.2rem" className="p-mb-4" />
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

export default Placeholder
