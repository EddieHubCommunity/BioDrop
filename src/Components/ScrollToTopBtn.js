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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    setScrollBtnVisibility(scrollBtnVisibility)
  }

  return (
    <BsFillArrowUpCircleFill
      style={scrollBtnVisibility ? {} : { opacity: '0' }}
      className="scrollToTop-btn"
      onClick={scrollToTop}
      size={50}
    />
  )
}

export default ScrollToTopBtn
