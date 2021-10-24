import React from 'react'
import PropTypes from 'prop-types'

import { Skeleton } from 'primereact/skeleton'

function Placeholder({ list }) {
  return (
        <div>
            <div className="p-d-flex p-ai-center p-jc-center p-mb-4">
                <Skeleton shape="circle" size="75px"/>
                <Skeleton shape="rectangle" width="30%" height="35px"/>
            </div>
            <div className="p-d-flex p-flex-column p-ai-center">
                {Object.keys(list).map((key) => {
                  return (<Skeleton
                          shape="rectangle"
                          width="70%"
                          height="35px"
                          className="p-mb-3"
                          key={`skeleton-${key}`}
                      />)
                })}
            </div>
        </div>
  )
}

Placeholder.propTypes = {
  list: PropTypes.array.isRequired,
}

export default Placeholder
