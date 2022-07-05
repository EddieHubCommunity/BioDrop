import React, { useState, useEffect } from 'react'
import { BsFillArrowUpCircleFill } from 'react-icons/bs'
import './ScrollToTopBtn.css'

function ScrollToTopBtn() {
  const [scrollBtnVisibility, setScrollBtnVisibility] = useState(false)

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setScrollBtnVisibility(true)
    } else {
      setScrollBtnVisibility(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  const scrollToTop = (e) => {
    if (e.type === 'click' || e.key === 'Enter') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }

  return (
    <BsFillArrowUpCircleFill
      tabIndex={0}
      onKeyPress={scrollToTop}
      style={scrollBtnVisibility ? {} : { display: 'none' }}
      className="scrollToTop-btn"
      onClick={scrollToTop}
      size={50}
      color={'#f53900'}
    />
  )
}

export default ScrollToTopBtn
