import React, { useRef, useState } from 'react'
import GetIcons from './Icons/GetIcons'
import PropTypes from 'prop-types'
import ShareIcon from './ShareIcon'
import { Toast } from 'primereact/toast'

import './ShareProfile.css'
import { useTheme } from '../ThemeContext'


export default function ShareProfile({ username }) {
  const [show, setShow] = useState(false)
  const toast = useRef(null)
  const profileUrl = location.href
  const darkTheme = useTheme()

  const CopyLink = () => {
    navigator.clipboard.writeText(profileUrl)
    toast.current.show({
      severity: 'success',
      summary: 'Link copied to clipboard.',
    })
  }

  document.querySelector('body').style.overflow = show ? 'hidden' : 'visible'

  return (
    <div className="flex justify-content-center">
      <Toast ref={toast} />
      <div onClick={() => setShow(!show)}>
        <GetIcons
          className={`${darkTheme ? 'text-white' : 'text-gray-900'}`}
          iconName="shareprofile"
        />
      </div>

      {show
        ? (
        <div className="flex w-screen align-content-center justify-content-center h-screen absolute top-0 left-0 right-0 bottom-0">
          <div
            onClick={() => setShow(!show)}
            className="w-screen absolute z-4 h-screen flex align-items-center justify-content-center bg-black-alpha-30"
          ></div>

          <div
            style={{ marginTop: '40vh', borderRadius: '1rem' }}
            className="flex bg-white justify-content-center z-5 absolute mx-auto align-items-center p-3 sm:p-6"
          >
            <ShareIcon
              link={`https://www.facebook.com/sharer/sharer.php?u=${profileUrl}`}
              label="Share on Facebook"
              iconName="facebook"
            />
            <ShareIcon
              link={`https://twitter.com/intent/tweet?text=Check out my LinkFree profile! ${profileUrl}`}
              label="Share on Twitter"
              iconName="twitter"
            />
            <ShareIcon
              link={`https://www.linkedin.com/sharing/share-offsite?url=${encodeURIComponent(
                profileUrl,
              )}`}
              label="Share on LinkedIn"
              iconName="linkedin"
            />
            <div className="cross-icon">
              <i
                className="pi pi-times border-solid hidden sm:inline-flex"
                onClick={() => setShow(null)}
              ></i>
            </div>
            <a
              className="mx-4 sm:mx-5"
              role="button"
              onClick={CopyLink}
              aria-label="Copy link to profile"
            >
              <GetIcons
                className="w-2rem h-2rem my-2rem cursor-pointer share-icons copyLink"
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
