import React, { useRef, useState } from 'react'
import GetIcons from './Icons/GetIcons'
import PropTypes from 'prop-types'
import ShareIcon from './ShareIcon'
import { Toast } from 'primereact/toast'

export default function ShareProfile({ username }) {
  const [show, setShow] = useState(false)
  const toast = useRef(null)

  const CopyLink = () => {
    navigator.clipboard.writeText(`http://linkfree.eddiehub.org/${username}`)
    toast.current.show({
      severity: 'success',
      summary: 'Link copied to clipboard.',
    })
  }

  return (
    <div className="flex justify-content-center">
      <Toast ref={toast} />

      <svg
        onClick={() => setShow(!show)}
        height="25px"
        viewBox="0 0 96 96"
        width="25px"
        className="cursor-pointer sm:ml-4"
      >
        <path d="M72,56c-4.813,0-9.12,2.137-12.054,5.501L39.643,51.35C39.873,50.269,40,49.149,40,48s-0.127-2.269-0.357-3.349  l20.303-10.152C62.879,37.864,67.187,40,72,40c8.836,0,16-7.164,16-16S80.836,8,72,8s-16,7.164-16,16  c0,1.149,0.127,2.269,0.357,3.349L36.054,37.501C33.121,34.136,28.814,32,24,32c-8.836,0-16,7.164-16,16c0,8.836,7.164,16,16,16  c4.814,0,9.12-2.137,12.054-5.501l20.304,10.152C56.127,69.731,56,70.851,56,72c0,8.836,7.164,16,16,16s16-7.164,16-16  S80.836,56,72,56z M72,16c4.418,0,8,3.582,8,8s-3.582,8-8,8s-8-3.582-8-8S67.582,16,72,16z M24,56c-4.418,0-8-3.582-8-8  c0-4.418,3.582-8,8-8s8,3.582,8,8C32,52.418,28.418,56,24,56z M72,80c-4.418,0-8-3.582-8-8s3.582-8,8-8s8,3.582,8,8S76.418,80,72,80  z" />
      </svg>

      {show
        ? (
        <div className="flex w-screen align-content-center justify-content-center h-screen absolute top-0 left-0 right-0 bottom-0">
          <div
            onClick={() => setShow(!show)}
            className="w-screen absolute z-4 h-screen flex align-items-center justify-content-center bg-black-alpha-30"
          ></div>

          <div
            style={{ marginTop: '40vh', borderRadius: '1rem' }}
            className="flex bg-white justify-content-center z-5 p-6 absolute mx-auto align-items-center"
          >
            <ShareIcon
              link={`https://www.facebook.com/sharer/sharer.php?u=https://linkfree.eddiehub.org/${username}`}
              label="Share on Facebook"
              iconName="facebook"
            />
            <ShareIcon
              link={`https://twitter.com/intent/tweet?text=Check out my LinkFree profile! https://linkfree.eddiehub.org/${username}`}
              label="Share on Twitter"
              iconName="twitter"
            />
            <ShareIcon
              link={`https://www.linkedin.com/sharing/share-offsite?url=https%3A%2F%2Flinkfree.eddiehub.org%2F${username}`}
              label="Share on LinkedIn"
              iconName="linkedin"
            />
            <a
              role="button"
              onClick={CopyLink}
              aria-label="Copy link to profile"
            >
              <GetIcons
                className="w-2rem h-2rem my-2rem cursor-pointer mx-5 share-icons copyLink"
                iconName="link"
                size={20}
              />
            </a>
          </div>
        </div>
          )
        : (
        <></>
          )}
    </div>
  )
}

ShareProfile.propTypes = {
  username: PropTypes.string.isRequired,
}
