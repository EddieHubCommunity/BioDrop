import './NavMenu.css'
import React from 'react'
import logo from '../Components/Icons/logo192.png'

const NavMenu = () => {
  function toggleNavMenu() {
    const navMenu = document.querySelector('.nav-links-container')
    navMenu.classList.toggle('hideMenu')
    const menuIcon = document.querySelector('.menu-container')
    menuIcon.classList.toggle('active')
  }
  return (
    <div className="nav-background">
      <div className="navbar-container">
        <div className="logo-close-container">
          <a href="#">
            <img src={logo} width="auto" height="40px" alt="Logo" />
          </a>
          <div href="#" className="menu-container icon" onClick={toggleNavMenu}>
            <span className="span-top"></span>
            <span className="span-middle"></span>
            <span className="span-bottom"></span>
          </div>
        </div>
        <div className="nav-links-container hideMenu">
          <div className="dropdown">
            <button className="dropbtn">Dropdown</button>
            <div className="dropdown-content">
              <a href="#">Link 1</a>
              <a href="#">Link 2</a>
              <a href="#">Link 3</a>
            </div>
          </div>
          <div className="dropdown">
            <button className="dropbtn">Dropdown</button>
            <div className="dropdown-content">
              <a href="#">Link 1</a>
              <a href="#">Link 2</a>
              <a href="#">Link 3</a>
            </div>
          </div>
          <div className="dropdown">
            <button className="dropbtn">Dropdown</button>
            <div className="dropdown-content">
              <a href="#">Link 1</a>
              <a href="#">Link 2</a>
              <a href="#">Link 3</a>
            </div>
          </div>
          <div className="dropdown">
            <button className="dropbtn">Dropdown</button>
            <div className="dropdown-content">
              <a href="#">Link 1</a>
              <a href="#">Link 2</a>
              <a href="#">Link 3</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavMenu
