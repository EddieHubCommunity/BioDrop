import React, { useState, useEffect } from 'react'
import './ScrollToTopBtn.css'

// icons
import { BsFillArrowUpCircleFill } from 'react-icons/bs'

// packages
import { animateScroll } from 'react-scroll'

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
      animateScroll.scrollToTop()
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
      color={'#b9b9b9'}
    />
  )
}

export default ScrollToTopBtn
