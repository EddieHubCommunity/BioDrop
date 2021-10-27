import React from 'react'

import { Skeleton } from 'primereact/skeleton'

function Placeholder() {
  return (
    <section>
      <div className="p-d-flex p-jc-center p-ai-center">
        <Skeleton className="p-avatar" shape="circle" size="4rem" />
        <Skeleton
          className="p-m-2"
          shape="rounded"
          height="30px"
          width="200px"
        />
        <Skeleton className="" shape="rounded" width="100px" />
      </div>
      <div className="p-d-flex p-jc-center w-50">
        <Skeleton
          className="p-mt-4"
          width="300px"
          height="50px"
          shape="rounded"
        />
      </div>
    </section>
  )
}

export default Placeholder
