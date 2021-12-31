import React from 'react'

import { Skeleton } from 'primereact/skeleton'

function Placeholder() {
  return (
    <section>
      <div className="flex justify-content-center align-items-center">
        <Skeleton className="p-avatar" shape="circle" size="4rem" />
        <Skeleton className="m-2" shape="rounded" height="30px" width="200px" />
        <Skeleton className="" shape="rounded" width="100px" />
      </div>
      <div className="flex justify-content-center w-50">
        <Skeleton
          className="mt-4"
          width="300px"
          height="50px"
          shape="rounded"
        />
      </div>
    </section>
  )
}

export default Placeholder
