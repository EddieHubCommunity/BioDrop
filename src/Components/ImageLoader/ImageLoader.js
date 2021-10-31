import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Skeleton } from 'primereact/skeleton'

const ImageLoader = ({ avatar, username }) => {
  const imgEl = useRef(null)
  const [loaded, setLoaded] = useState(false)
  const onImageLoaded = () => setLoaded(true)

  useEffect(() => {
    const imgElCurrent = imgEl.current

    if (imgElCurrent) {
      imgElCurrent.addEventListener('load', onImageLoaded)
      return () => imgElCurrent.removeEventListener('load', onImageLoaded)
    }
  }, [])

  return (
    <>
      {!loaded && <Skeleton className="p-avatar" shape="circle" size="4rem" />}
      {loaded && <img ref={imgEl} src={avatar} alt={username} />}
    </>
  )
}

ImageLoader.propTypes = {
  avatar: PropTypes.string,
  username: PropTypes.string,
}

export default ImageLoader
